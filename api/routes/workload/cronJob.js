var express = require("express");

// Utils
var batchV1Beta1API = require("../../utils/kube").getBatchV1Beta1API();

var router = express.Router();

router.get("/:namespace/get-cron-jobs", async function (req, res, next) {
  try {
    let k8sResponse = await batchV1Beta1API.listNamespacedCronJob(
      req.params.namespace
    );
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

module.exports = router;
