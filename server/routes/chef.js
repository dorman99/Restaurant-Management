var express = require('express');
var router = express.Router();
var controllerChef =  require('../controllers/controllerChef')

router 
	.get('/', controllerChef.getAllMenu)
	.post('/:id',controllerChef.doneCook)
module.exports = router;