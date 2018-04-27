var express = require('express');
var router = express.Router();
var orderFood =  require('../controllers/controllerOrderDishes')
var auth = require('../middlewares/auth')
router
	.get('/',auth.auth,orderFood.MyOrder)
	.post('/',auth.auth,orderFood.makeOrder)


module.exports = router;