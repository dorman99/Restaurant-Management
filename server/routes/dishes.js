var express = require('express');
var router = express.Router();
var dishesControllers = require('../controllers/controllerDishes')
var auth  = require('../middlewares/adminauth')

router
  .get('/',dishesControllers.findAll)
  .post('/', auth.auth,dishesControllers.addMenu)
  .put('/:id', auth.auth,dishesControllers.editMenu)
  .delete('/:id',auth.auth,dishesControllers.destroyMenu)

module.exports = router;
