import NamespaceSelect from "../components/NamespaceSelect";

let menuStructure = [
  {
    type: "submenu",
    name: "cluster",
    stylizedName: "Cluster",
    key: "cluster",
    path: "/cluster",
    items: [
      {
        type: "item",
        name: "namespaces",
        stylizedName: "Namespaces",
        key: "cluster-namespaces",
        path: "/namespaces",
      },
      {
        type: "item",
        name: "nodes",
        stylizedName: "Nodes",
        key: "cluster-nodes",
        path: "/nodes",
      },
      {
        type: "item",
        name: "persistentvolumes",
        stylizedName: "Persistent Volumes",
        key: "cluster-persistentvolumes",
        path: "/persistentvolumes",
      },
      {
        type: "item",
        name: "roles",
        stylizedName: "Roles",
        key: "cluster-roles",
        path: "/roles",
      },
      {
        type: "item",
        name: "storageclasses",
        stylizedName: "Storage Classes",
        key: "cluster-storageclasses",
        path: "/storageclasses",
      },
    ],
  },
  {
    type: "submenu",
    name: "workloads",
    stylizedName: "Workloads",
    key: "workloads",
    path: "/workloads",
    items: [
      {
        type: "component",
        name: "namespace-select",
        key: "namespace-select",
        component: <NamespaceSelect />,
      },
      {
        type: "item",
        name: "cronjobs",
        stylizedName: "Cron Jobs",
        key: "workloads-cronjobs",
        path: "/cronjobs",
      },
      {
        type: "item",
        name: "daemonsets",
        stylizedName: "Daemon Sets",
        key: "workloads-daemonsets",
        path: "/daemonsets",
      },
      {
        type: "item",
        name: "deployments",
        stylizedName: "Deployments",
        key: "workloads-deployments",
        path: "/deployments",
      },
      {
        type: "item",
        name: "jobs",
        stylizedName: "Jobs",
        key: "workloads-jobs",
        path: "/jobs",
      },
      {
        type: "item",
        name: "pods",
        stylizedName: "Pods",
        key: "workloads-pods",
        path: "/pods",
      },
      {
        type: "item",
        name: "replicasets",
        stylizedName: "Replica Sets",
        key: "workloads-replicasets",
        path: "/replicasets",
      },
    ],
  },
];

export default menuStructure;