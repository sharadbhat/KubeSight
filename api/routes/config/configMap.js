var express = require("express");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

var router = express.Router();

router.get("/:namespace/get-config-maps", async function (req, res) {
  try {
    let k8sResponse = await coreV1API.listNamespacedConfigMap(
      req.params.namespace
    );
    let configMaps = [];
    k8sResponse.body.items.map((item, i) => {
      configMaps.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          configMaps,
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
