var express = require("express");

// Utils
var batchV1API = require("../../utils/kube").getBatchV1API();

var router = express.Router();

router.get("/:namespace/get-jobs", async function (req, res, next) {
  try {
    let k8sResponse = await batchV1API.listNamespacedJob(req.params.namespace);
    let jobs = [];

    k8sResponse.body.items.map((item, i) => {
      jobs.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          jobs,
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

module.exports = router;
