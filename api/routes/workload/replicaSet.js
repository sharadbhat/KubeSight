var express = require("express");

// Utils
var appsV1API = require("../../utils/kube").getAppsV1API();

var router = express.Router();

router.get("/:namespace/get-replica-sets", async function (req, res, next) {
  try {
    let k8sResponse = await appsV1API.listNamespacedReplicaSet(
      req.params.namespace
    );
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

module.exports = router;
