var express = require("express");

// Utils
var coreV1API = require("../utils/kube").getCoreV1API();
var rbacAuthorizationV1API = require("../utils/kube").getRbacAuthorizationV1API();
var storageV1API = require("../utils/kube").getStorageV1API();

var router = express.Router();

router.get("/get-namespaces", async function (req, res, next) {
  try {
    let k8sResponse = await coreV1API.listNamespace();
    let namespaces = [];
    k8sResponse.body.items.map((item, i) => {
      namespaces.push(item.metadata.name);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespaces,
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

router.get("/get-nodes", async function (req, res, next) {
  try {
    let k8sResponse = await coreV1API.listNode();
    let nodes = [];
    k8sResponse.body.items.map((item, i) => {
      nodes.push(item.metadata.name);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          nodes,
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

router.get("/get-persistent-volumes", async function (req, res, next) {
  try {
    let k8sResponse = await coreV1API.listPersistentVolume();
    let persistentVolumes = [];
    k8sResponse.body.items.map((item, i) => {
      persistentVolumes.push(item.metadata.name);
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
          errorMessage: "Internal Server Error",
        },
      },
    });
  }
});

router.get("/get-cluster-roles", async function (req, res, next) {
  try {
    let k8sResponse = await rbacAuthorizationV1API.listRoleForAllNamespaces();
    let roles = [];
    k8sResponse.body.items.map((item, i) => {
      roles.push(item.metadata.name);
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
          errorMessage: "Internal Server Error",
        },
      },
    });
  }
});

router.get("/get-storage-classes", async function (req, res, next) {
  try {
    let k8sResponse = await storageV1API.listStorageClass();
    let storageClasses = [];
    k8sResponse.body.items.map((item, i) => {
      storageClasses.push(item.metadata.name);
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
          errorMessage: "Internal Server Error",
        },
      },
    });
  }
});

module.exports = router;
