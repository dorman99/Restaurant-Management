var express = require('express');
var router = express.Router();
const controllerUsers = require('../controllers/controllerUsers')

router 
  .get('/',controllerUsers.allUser)
  .post('/',controllerUsers.newUser)
  .put('/:id',controllerUsers.editUser)
  .delete('/:id',controllerUsers.destroyUser)

module.exports = router;
