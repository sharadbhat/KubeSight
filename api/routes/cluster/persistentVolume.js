var express = require("express");
const { checkSchema, validationResult } = require("express-validator");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

var formatErrors = require("../../utils/formatErrors");

var router = express.Router();

router.get("/get-persistent-volumes", async function (req, res, next) {
  try {
    let k8sResponse = await coreV1API.listPersistentVolume();
    let persistentVolumes = [];
    k8sResponse.body.items.map((item, i) => {
      persistentVolumes.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          persistentVolumes,
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
  "/read-persistent-volume",
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

      let k8sResponse = await coreV1API.readPersistentVolume(req.query.name);

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
