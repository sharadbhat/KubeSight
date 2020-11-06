var express = require("express");

// Utils
var coreV1API = require("../utils/kube").getCoreV1API();
var appsV1API = require("../utils/kube").getAppsV1API();
var batchV1API = require("../utils/kube").getBatchV1API();
var batchV1Beta1API = require("../utils/kube").getBatchV1Beta1API();

var router = express.Router();

router.get("/:namespace/get-cron-jobs", async function (req, res, next) {
  try {
    let k8sResponse = await batchV1Beta1API.listNamespacedCronJob(
      req.params.namespace
    );
    let cronJobs = [];

    k8sResponse.body.items.map((item, i) => {
      cronJobs.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          cronJobs,
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

router.get("/:namespace/get-daemon-sets", async function (req, res, next) {
  try {
    let k8sResponse = await appsV1API.listNamespacedDaemonSet(
      req.params.namespace
    );
    let daemonSets = [];

    k8sResponse.body.items.map((item, i) => {
      daemonSets.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          daemonSets,
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

router.get("/:namespace/get-deployments", async function (req, res, next) {
  try {
    let k8sResponse = await appsV1API.listNamespacedDeployment(
      req.params.namespace
    );
    let deployments = [];

    k8sResponse.body.items.map((item, i) => {
      deployments.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          deployments,
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

router.get("/:namespace/get-jobs", async function (req, res, next) {
  try {
    let k8sResponse = await batchV1API.listNamespacedJob(req.params.namespace);
    let jobs = [];

    k8sResponse.body.items.map((item, i) => {
      jobs.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          jobs,
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

router.get("/:namespace/get-pods", async function (req, res, next) {
  try {
    let k8sResponse = await coreV1API.listNamespacedPod(req.params.namespace);
    let pods = [];

    k8sResponse.body.items.map((item, i) => {
      pods.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          pods,
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

router.get("/:namespace/get-replica-sets", async function (req, res, next) {
  try {
    let k8sResponse = await appsV1API.listNamespacedReplicaSet(
      req.params.namespace
    );
    let replicaSets = [];

    k8sResponse.body.items.map((item, i) => {
      replicaSets.push(item);
    });

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          namespace: req.params.namespace,
          replicaSets,
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
