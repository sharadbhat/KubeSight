const k8s = require("@kubernetes/client-node");

let coreV1API = null;
let appsV1API = null;
let batchV1API = null;
let batchV1Beta1API = null;
let rbacAuthorizationV1API = null;
let storageV1API = null;

let initConn = new Promise((resolve, reject) => {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  coreV1API = kc.makeApiClient(k8s.CoreV1Api);
  appsV1API = kc.makeApiClient(k8s.AppsV1Api);
  batchV1API = kc.makeApiClient(k8s.BatchV1Api);
  batchV1Beta1API = kc.makeApiClient(k8s.BatchV1beta1Api);
  rbacAuthorizationV1API = kc.makeApiClient(k8s.RbacAuthorizationV1Api);
  storageV1API = kc.makeApiClient(k8s.StorageV1Api);

  batchV1Beta1API.readNamespacedCronJob("hello", "default").then((res) => {
    console.log(JSON.stringify(res.response.toJSON().body, null, 4));
  });

  if (coreV1API) {
    resolve();
  } else {
    reject();
  }
});

getCoreV1API = () => {
  return coreV1API;
};

getAppsV1API = () => {
  return appsV1API;
};

getBatchV1API = () => {
  return batchV1API;
};

getBatchV1Beta1API = () => {
  return batchV1Beta1API;
};

getRbacAuthorizationV1API = () => {
  return rbacAuthorizationV1API;
};

getStorageV1API = () => {
  return storageV1API;
};

module.exports = {
  initConn,
  getCoreV1API,
  getAppsV1API,
  getBatchV1API,
  getBatchV1Beta1API,
  getRbacAuthorizationV1API,
  getStorageV1API,
};
