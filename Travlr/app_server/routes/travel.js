var express = require('express');
var router = express.Router();
var controller = require('../Controllers/travel');

/* GET Travel page*/
router.get('/', controller.travel);

module.exports = router;