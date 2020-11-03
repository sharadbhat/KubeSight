import CronjobsList from "./subpages/CronjobsList";
import PodsList from "./subpages/PodsList";

let routes = [
  {
    key: "workloads-cronjobs",
    path: "/workloads/cronjobs",
    exact: true,
    component: CronjobsList,
  },
  {
    key: "workloads-pods",
    path: "/workloads/pods",
    exact: true,
    component: PodsList,
  },
];

export default routes;
