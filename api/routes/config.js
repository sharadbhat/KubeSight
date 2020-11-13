var express = require("express");

var router = express.Router();

var configMapRoutes = require("./config/configMap");
var pvcRoutes = require("./config/pvc");
var secretRoutes = require("./config/secret");

router.use(configMapRoutes);
router.use(pvcRoutes);
router.use(secretRoutes);

module.exports = router;
