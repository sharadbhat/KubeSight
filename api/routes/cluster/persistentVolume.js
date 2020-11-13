var express = require("express");

// Utils
var coreV1API = require("../../utils/kube").getCoreV1API();

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

module.exports = router;
