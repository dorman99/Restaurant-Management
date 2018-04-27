var express = require('express');
var router = express.Router();
var controllerLogin = require('../controllers/login')

router
	.post('/',controllerLogin.login)

module.exports = router;