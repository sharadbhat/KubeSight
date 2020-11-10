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
        path: "/persistent-volumes",
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
        path: "/storage-classes",
      },
    ],
  },
  {
    type: "component",
    name: "namespace-select",
    key: "namespace-select",
    props: {
      key: "namespace-select",
    },
    component: NamespaceSelect,
  },
  {
    type: "submenu",
    name: "workloads",
    stylizedName: "Workloads",
    key: "workloads",
    path: "/workloads",
    items: [
      {
        type: "item",
        name: "overview",
        stylizedName: "Overview",
        key: "workloads-overview",
        path: "/overview",
      },
      {
        type: "item",
        name: "cronjobs",
        stylizedName: "Cron Jobs",
        key: "workloads-cronjobs",
        path: "/cron-jobs",
      },
      {
        type: "item",
        name: "daemonsets",
        stylizedName: "Daemon Sets",
        key: "workloads-daemonsets",
        path: "/daemon-sets",
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
        path: "/replica-sets",
      },
      {
        type: "item",
        name: "statefulsets",
        stylizedName: "Stateful Sets",
        key: "workloads-statefulsets",
        path: "/stateful-sets",
      },
    ],
  },
  {
    type: "submenu",
    name: "config",
    stylizedName: "Config and Storage",
    key: "config",
    path: "/config",
    items: [
      {
        type: "item",
        name: "configmaps",
        stylizedName: "Config Maps",
        key: "config-configmaps",
        path: "/config-maps",
      },
      {
        type: "item",
        name: "pvc",
        stylizedName: "PV Claims",
        key: "config-pvc",
        path: "/persistent-volume-claims",
      },
      {
        type: "item",
        name: "secrets",
        stylizedName: "Secrets",
        key: "config-secrets",
        path: "/secrets",
      },
    ],
  },
];

export default menuStructure;
