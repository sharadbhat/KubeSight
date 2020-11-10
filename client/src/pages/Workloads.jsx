import Overview from "./subpages/workloads/Overview";
import CronjobsList from "./subpages/workloads/CronjobsList";
import DaemonsetsList from "./subpages/workloads/DaemonsetsList";
import DeploymentsList from "./subpages/workloads/DeploymentsList";
import JobsList from "./subpages/workloads/JobsList";
import PodsList from "./subpages/workloads/PodsList";
import ReplicasetsList from "./subpages/workloads/ReplicasetsList";
import ReplicationcontrollersList from "./subpages/workloads/ReplicationcontrollersList";
import StatefulsetsList from "./subpages/workloads/StatefulsetsList";

let routes = [
  {
    key: "workloads-overview",
    path: "/workloads/overview",
    exact: true,
    component: Overview,
  },
  {
    key: "workloads-cronjobs",
    path: "/workloads/cron-jobs",
    exact: true,
    component: CronjobsList,
  },
  {
    key: "workloads-daemonsets",
    path: "/workloads/daemon-sets",
    exact: true,
    component: DaemonsetsList,
  },
  {
    key: "workloads-deployments",
    path: "/workloads/deployments",
    exact: true,
    component: DeploymentsList,
  },
  {
    key: "workloads-jobs",
    path: "/workloads/jobs",
    exact: true,
    component: JobsList,
  },
  {
    key: "workloads-pods",
    path: "/workloads/pods",
    exact: true,
    component: PodsList,
  },
  {
    key: "workloads-replicasets",
    path: "/workloads/replica-sets",
    exact: true,
    component: ReplicasetsList,
  },
  {
    key: "workloads-replicationcontrollers",
    path: "/workloads/replication-controllers",
    exact: true,
    component: ReplicationcontrollersList,
  },
  {
    key: "workloads-statefulsets",
    path: "/workloads/stateful-sets",
    exact: true,
    component: StatefulsetsList,
  },
];

export default routes;
