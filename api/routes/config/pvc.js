var express = require("express");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

var router = express.Router();

router.get("/:namespace/get-pvc", async function (req, res) {
  try {
    let k8sResponse = await coreV1API.listNamespacedPersistentVolumeClaim(
      req.params.namespace
    );
    let pvc = [];
    k8sResponse.body.items.map((item, i) => {
      pvc.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          pvc,
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
