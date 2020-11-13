var express = require("express");

// Utils
var rbacAuthorizationV1API = require("../../utils/kube").getRbacAuthorizationV1API();

var router = express.Router();

router.get("/get-cluster-roles", async function (req, res, next) {
  try {
    let k8sResponse = await rbacAuthorizationV1API.listRoleForAllNamespaces();
    let roles = [];
    k8sResponse.body.items.map((item, i) => {
      roles.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          roles,
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
