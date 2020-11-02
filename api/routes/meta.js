var express = require("express");
const k8s = require("@kubernetes/client-node");

var router = express.Router();

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

router.get("/get-namespaces", async function (req, res, next) {
  try {
    let k8sResponse = await k8sApi.listNamespace();
    let namespaces = [];
    k8sResponse.body.items.map((item, i) => {
      namespaces.push(item.metadata.name);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespaces: namespaces,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      response: {
        statusCode: 500,
        body: {
          errorMessage: "Internal Server Error",
        },
      },
    });
  }
});

module.exports = router;
