var express = require("express");
const { checkSchema, validationResult } = require("express-validator");

// Utils
var appsV1API = require("../../utils/kube").getAppsV1API();

var formatErrors = require("../../utils/formatErrors");

var router = express.Router();

router.get("/:namespace/get-replica-sets", async function (req, res, next) {
  try {
    let k8sResponse;
    if (req.params.namespace === "_all_") {
      k8sResponse = await appsV1API.listReplicaSetForAllNamespaces();
    } else {
      k8sResponse = await appsV1API.listNamespacedReplicaSet(
        req.params.namespace
      );
    }
    let replicaSets = [];

    k8sResponse.body.items.map((item, i) => {
      replicaSets.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          replicaSets,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      response: {
        statusCode: 500,
        body: {
          errorMessages: ["Internal Server Error"],
        },
      },
    });
  }
});

router.get(
  "/:namespace/read-replica-set",
  checkSchema({
    name: {
      in: ["query"],
      isString: true,
    },
  }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      let errorList = formatErrors(errors);

      if (errorList.length > 0) {
        return res.status(400).json({
          response: {
            statusCode: 400,
            body: {
              errorMessages: errorList,
            },
          },
        });
      }

      let k8sResponse = await appsV1API.readNamespacedReplicaSet(
        req.query.name,
        req.params.namespace
      );

      res.status(200).json({
        response: {
          statusCode: 200,
          body: k8sResponse.body,
        },
      });
    } catch (err) {
      res.status(500).json({
        response: {
          statusCode: 500,
          body: {
            errorMessages: ["Internal Server Error"],
          },
        },
      });
    }
  }
);

module.exports = router;
