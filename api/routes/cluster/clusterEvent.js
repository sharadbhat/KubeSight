var express = require("express");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

var router = express.Router();

router.get("/get-cluster-events", async function (req, res, next) {
  try {
    let k8sResponse = await coreV1API.listEventForAllNamespaces();
    let clusterEvents = [];
    k8sResponse.body.items.map((item, i) => {
      clusterEvents.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          clusterEvents,
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
