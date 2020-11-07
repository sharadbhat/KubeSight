import Overview from "./subpages/cluster/Overview";
import NamespacesList from "./subpages/cluster/NamespacesList";
import NodesList from "./subpages/cluster/NodesList";
import PersistentVolumesList from "./subpages/cluster/PersistentVolumesList";
import RolesList from "./subpages/cluster/RolesList";
import StorageClassesList from "./subpages/cluster/StorageClassesList";

let routes = [
  {
    key: "cluster-overview",
    path: "/cluster/overview",
    exact: true,
    component: Overview,
  },
  {
    key: "cluster-namespaces",
    path: "/cluster/namespaces",
    exact: true,
    component: NamespacesList,
  },
  {
    key: "cluster-nodes",
    path: "/cluster/nodes",
    exact: true,
    component: NodesList,
  },
  {
    key: "cluster-persistentvolumes",
    path: "/cluster/persistent-volumes",
    exact: true,
    component: PersistentVolumesList,
  },
  {
    key: "cluster-roles",
    path: "/cluster/roles",
    exact: true,
    component: RolesList,
  },
  {
    key: "cluster-storageclasses",
    path: "/cluster/storage-classes",
    exact: true,
    component: StorageClassesList,
  },
];

export default routes;
