var express = require("express");

// Utils
var storageV1API = require("../../utils/kube").getStorageV1API();

var router = express.Router();

router.get("/get-storage-classes", async function (req, res, next) {
  try {
    let k8sResponse = await storageV1API.listStorageClass();
    let storageClasses = [];
    k8sResponse.body.items.map((item, i) => {
      storageClasses.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          storageClasses,
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
