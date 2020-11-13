var express = require("express");

// Utils
var stats = require("../utils/stats");

var cronJobRoutes = require("./workload/cronJob");
var daemonSetRoutes = require("./workload/daemonSet");
var deploymentRoutes = require("./workload/deployment");
var jobRoutes = require("./workload/job");
var podRoutes = require("./workload/pod");
var replicaSetRoutes = require("./workload/replicaSet");
var replicationControllerRoutes = require("./workload/replicationController");
var statefulSetRoutes = require("./workload/statefulSet");

var router = express.Router();

router.use(cronJobRoutes);
router.use(daemonSetRoutes);
router.use(deploymentRoutes);
router.use(jobRoutes);
router.use(podRoutes);
router.use(replicaSetRoutes);
router.use(replicationControllerRoutes);
router.use(statefulSetRoutes);

router.get("/:namespace/get-overview", async function (req, res, next) {
  try {
    let cronJobStats = await stats.cronJobStats(req.params.namespace);
    let daemonSetStats = await stats.daemonSetStats(req.params.namespace);
    let deploymentStats = await stats.deploymentStats(req.params.namespace);
    let jobStats = await stats.jobStats(req.params.namespace);
    let podStats = await stats.podStats(req.params.namespace);
    let replicaSetStats = await stats.replicaSetStats(req.params.namespace);
    let statefulSetStats = await stats.statefulSetStats(req.params.namespace);
    let replicationControllerStats = await stats.replicationControllerStats(
      req.params.namespace
    );

    res.status(200).json({
      response: {
        statusCode: 200,
        body: {
          cronJobs: cronJobStats,
          daemonSets: daemonSetStats,
          deployments: deploymentStats,
          jobs: jobStats,
          pods: podStats,
          replicaSets: replicaSetStats,
          statefulSets: statefulSetStats,
          replicationControllers: replicationControllerStats,
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
