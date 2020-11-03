import CronjobsList from "./subpages/workloads/CronjobsList";
import DaemonsetsList from "./subpages/workloads/DaemonsetsList";
import DeploymentsList from "./subpages/workloads/DeploymentsList";
import JobsList from "./subpages/workloads/JobsList";
import PodsList from "./subpages/workloads/PodsList";
import ReplicasetsList from "./subpages/workloads/ReplicasetsList";

let routes = [
  {
    key: "workloads-cronjobs",
    path: "/workloads/cronjobs",
    exact: true,
    component: CronjobsList,
  },
  {
    key: "workloads-daemonsets",
    path: "/workloads/daemonsets",
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
    path: "/workloads/replicasets",
    exact: true,
    component: ReplicasetsList,
  },
];

export default routes;
