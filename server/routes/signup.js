var express = require('express');
var router = express.Router();
var signupController = require('../controllers/signup')

router
	.post('/', signupController.signup)

module.exports = router;