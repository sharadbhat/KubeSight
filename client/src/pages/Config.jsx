import ConfigMaps from "./subpages/config/ConfigMaps";
import PVC from "./subpages/config/PVC";
import Secrets from "./subpages/config/Secrets";

let routes = [
  {
    key: "config-configmaps",
    path: "/config/config-maps",
    exact: true,
    component: ConfigMaps,
  },
  {
    key: "config-pvc",
    path: "/config/persistent-volume-claims",
    exact: true,
    component: PVC,
  },
  {
    key: "config-secrets",
    path: "/config/secrets",
    exact: true,
    component: Secrets,
  },
];

export default routes;
