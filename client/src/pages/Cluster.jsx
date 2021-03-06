import NamespacesList from "./subpages/cluster/NamespacesList";
import NodesList from "./subpages/cluster/NodesList";
import PersistentVolumesList from "./subpages/cluster/PersistentVolumesList";
import ClusterRolesList from "./subpages/cluster/ClusterRolesList";
import StorageClassesList from "./subpages/cluster/StorageClassesList";

let routes = [
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
    key: "cluster-clusterroles",
    path: "/cluster/cluster-roles",
    exact: true,
    component: ClusterRolesList,
  },
  {
    key: "cluster-storageclasses",
    path: "/cluster/storage-classes",
    exact: true,
    component: StorageClassesList,
  },
];

export default routes;
