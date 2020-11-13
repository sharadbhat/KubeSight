var express = require("express");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

var router = express.Router();

router.get("/:namespace/get-replication-controllers", async function (
  req,
  res,
  next
) {
  try {
    let k8sResponse = await coreV1API.listNamespacedReplicationController(
      req.params.namespace
    );
    let replicationControllers = [];

    k8sResponse.body.items.map((item, i) => {
      replicationControllers.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          replicationControllers,
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
