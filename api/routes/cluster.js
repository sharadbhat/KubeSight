var express = require("express");

var router = express.Router();

var namespaceRoutes = require("./cluster/namespace");
var nodeRoutes = require("./cluster/node");
var persistentVolumeRoutes = require("./cluster/persistentVolume");
var clusterRoleRoutes = require("./cluster/clusterRole");
var storageClassRoutes = require("./cluster/storageClass");

router.use(namespaceRoutes);
router.use(nodeRoutes);
router.use(persistentVolumeRoutes);
router.use(clusterRoleRoutes);
router.use(storageClassRoutes);

module.exports = router;
