var express = require("express");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

var router = express.Router();

router.get("/:namespace/get-secrets", async function (req, res) {
  try {
    let k8sResponse = await coreV1API.listNamespacedSecret(
      req.params.namespace
    );
    let secrets = [];
    k8sResponse.body.items.map((item, i) => {
      secrets.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          secrets,
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
