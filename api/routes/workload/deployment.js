var express = require("express");

// Utils
var appsV1API = require("../../utils/kube").getAppsV1API();

var router = express.Router();

router.get("/:namespace/get-deployments", async function (req, res, next) {
  try {
    let k8sResponse = await appsV1API.listNamespacedDeployment(
      req.params.namespace
    );
    let deployments = [];

    k8sResponse.body.items.map((item, i) => {
      deployments.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          deployments,
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
