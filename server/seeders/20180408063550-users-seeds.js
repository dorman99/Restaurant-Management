'use strict';
const bcrypt = require('bcrypt');
const salt = 10;
module.exports = {
  up: (queryInterface, Sequelize) => {
    let arrUsers = [
      {
        name: 'admin',
        username: 'admin',
        password: 'admin',
        role: 'admin'
      },
      {
        name: 'john Doe',
        username: 'johndoe99',
        password: '12345qwerty',
        role: 'customer'
      }, {
        name: 'Juna',
        username: 'junachep',
        password: '12345qwerty',
        role: 'chef'
      }
    ]

    arrUsers.forEach(el=>{
      var hash = bcrypt.hashSync(el.password, salt)
      el.password = hash
    })
    return queryInterface.bulkInsert('Users', [...arrUsers]
    )
  },

  down: (queryInterface, Sequelize) => {
  }
};
