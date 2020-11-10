var coreV1API = require("./kube").getCoreV1API();
var appsV1API = require("./kube").getAppsV1API();
var batchV1API = require("./kube").getBatchV1API();
var batchV1Beta1API = require("./kube").getBatchV1Beta1API();

async function cronJobStats(namespace) {
  let runningCronJobs = 0;
  let pausedCronJobs = 0;
  let totalCronJobs = 0;

  let cronJobsResponse = await batchV1Beta1API.listNamespacedCronJob(namespace);

  cronJobsResponse.body.items.forEach((cronJob) => {
    if (cronJob.spec.suspend) {
      pausedCronJobs += 1;
    } else {
      runningCronJobs += 1;
    }
    totalCronJobs += 1;
  });

  return {
    paused: pausedCronJobs,
    running: runningCronJobs,
    total: totalCronJobs,
  };
}

async function daemonSetStats(namespace) {
  let pendingDaemonSets = 0;
  let readyDaemonSets = 0;
  let totalDaemonSets = 0;

  let daemonSetsResponse = await appsV1API.listNamespacedDaemonSet(namespace);
  daemonSetsResponse.body.items.forEach((item) => {
    totalDaemonSets += 1;
    if (item.status.numberUnavailable > 0) {
      pendingDaemonSets += 1;
    } else {
      readyDaemonSets += 1;
    }
  });
  return {
    pending: pendingDaemonSets,
    ready: readyDaemonSets,
    total: totalDaemonSets,
  };
}

async function deploymentStats(namespace) {
  let readyDeployments = 0;
  let pendingDeployments = 0;
  let totalDeployments = 0;

  let deploymentsResponse = await appsV1API.listNamespacedDeployment(namespace);
  deploymentsResponse.body.items.forEach((item) => {
    if (item.status.unavailableReplicas > 0) {
      pendingDeployments += 1;
    } else {
      readyDeployments += 1;
    }
    totalDeployments += 1;
  });
  return {
    pending: pendingDeployments,
    ready: readyDeployments,
    total: totalDeployments,
  };
}

async function jobStats(namespace) {
  let activeJobs = 0;
  let successfulJobs = 0;
  let failedJobs = 0;
  let totalJobs = 0;

  let jobsResponse = await batchV1API.listNamespacedJob(namespace);

  jobsResponse.body.items.forEach((job) => {
    if (job.status.active > 0) {
      activeJobs += 1;
    } else if (job.status.succeeded > 0) {
      successfulJobs += 1;
    } else if (job.status.failed > 0) {
      failedJobs += 1;
    }
    totalJobs += 1;
  });

  return {
    active: activeJobs,
    successful: successfulJobs,
    failed: failedJobs,
    total: totalJobs,
  };
}

async function podStats(namespace) {
  let pendingPods = 0;
  let runningPods = 0;
  let successfulPods = 0;
  let failedPods = 0;
  let totalPods = 0;

  let podsResponse = await coreV1API.listNamespacedPod(namespace);

  podsResponse.body.items.forEach((pod) => {
    totalPods += 1;
    switch (pod.status.phase) {
      case "Pending":
        pendingPods += 1;
        break;
      case "Running":
        runningPods += 1;
        break;
      case "Succeeded":
        successfulPods += 1;
        break;
      case "Failed":
        failedPods += 1;
        break;
      default:
        break;
    }
  });

  return {
    pending: pendingPods,
    running: runningPods,
    successful: successfulPods,
    failed: failedPods,
    total: totalPods,
  };
}

async function replicaSetStats(namespace) {
  let readyReplicaSets = 0;
  let pendingReplicaSets = 0;
  let totalReplicaSets = 0;

  let replicaSetsResponse = await appsV1API.listNamespacedReplicaSet(namespace);

  replicaSetsResponse.body.items.forEach((item) => {
    totalReplicaSets += 1;
    if (item.spec.replicas === item.status.readyReplicas) {
      readyReplicaSets += 1;
    } else {
      pendingReplicaSets += 1;
    }
  });

  return {
    ready: readyReplicaSets,
    pending: pendingReplicaSets,
    total: totalReplicaSets,
  };
}

async function replicationControllerStats(namespace) {
  let pendingReplicationControllers = 0;
  let readyReplicationControllers = 0;
  let totalReplicationControllers = 0;

  let statefulSetsResponse = await coreV1API.listNamespacedReplicationController(
    namespace
  );

  statefulSetsResponse.body.items.forEach((item) => {
    totalReplicationControllers += 1;
    if (item.spec.replicas === item.status.readyReplicas) {
      readyReplicationControllers += 1;
    } else {
      pendingReplicationControllers += 1;
    }
  });

  return {
    ready: readyReplicationControllers,
    pending: pendingReplicationControllers,
    total: totalReplicationControllers,
  };
}

async function statefulSetStats(namespace) {
  let pendingStatefulSets = 0;
  let readyStatefulSets = 0;
  let totalStatefulSets = 0;

  let statefulSetsResponse = await appsV1API.listNamespacedStatefulSet(
    namespace
  );

  statefulSetsResponse.body.items.forEach((item) => {
    totalStatefulSets += 1;
    if (item.spec.replicas === item.status.readyReplicas) {
      readyStatefulSets += 1;
    } else {
      pendingStatefulSets += 1;
    }
  });

  return {
    ready: readyStatefulSets,
    pending: pendingStatefulSets,
    total: totalStatefulSets,
  };
}

module.exports = {
  cronJobStats,
  daemonSetStats,
  deploymentStats,
  jobStats,
  podStats,
  replicaSetStats,
  replicationControllerStats,
  statefulSetStats,
};
