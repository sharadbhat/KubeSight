var express = require("express");
const { checkSchema, validationResult } = require("express-validator");

// Utils
var batchV1Beta1API = require("../../utils/kube").getBatchV1Beta1API();

var formatErrors = require("../../utils/formatErrors");

var router = express.Router();

router.get("/:namespace/get-cron-jobs", async function (req, res, next) {
  try {
    let k8sResponse;
    if (req.params.namespace === "_all_") {
      k8sResponse = await batchV1Beta1API.listCronJobForAllNamespaces();
    } else {
      k8sResponse = await batchV1Beta1API.listNamespacedCronJob(
        req.params.namespace
      );
    }
    let cronJobs = [];

    k8sResponse.body.items.map((item, i) => {
      cronJobs.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          cronJobs,
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
  "/:namespace/read-cron-job",
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

      let k8sResponse = await batchV1Beta1API.readNamespacedCronJob(
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

router.delete(
  "/:namespace/delete-cron-job",
  checkSchema({
    name: {
      in: ["query"],
      isString: true,
    },
  }),
  async function (req, res) {
  try {
    await batchV1Beta1API.deleteNamespacedCronJob(
      req.query.name,
      req.params.namespace
    );
    res.status(200).json({
      response: {
        statusCode: 200
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

module.exports = router;
