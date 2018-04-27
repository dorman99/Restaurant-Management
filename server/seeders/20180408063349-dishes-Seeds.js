'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Dishes', [
     {
     name: 'Ayam Geprek',
     cookDuration: 15,
     stock: true,
     image: 'https://i2.wp.com/resepkoki.id/wp-content/uploads/2017/07/Resep-Ayam-geprek-jogja.jpg?fit=2322%2C2167&ssl=1',
     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     price: 15000,
     },
     {
       name: 'Ayam Gepuk',
       cookDuration: 10,
       stock: true,
       image: 'https://static.viva.co.id/thumbs3/2017/08/28/59a3b6b6acf0e-ayam-geprek_665_374.jpg',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       price: 20000,
      },
     {
       name: 'Ayam Taliwang',
       cookDuration: 12,
       stock: true,
       image: 'https://services.halallifestyle.id/fileload/ayamjpg-ERfV.jpg',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       price: 19000,
     },
     {
       name: 'Jus Jeruk',
       cookDuration: 8,
       stock: true,
       image: 'https://s1.bukalapak.com/img/1961647101/w-1000/Jus_Buah_Segar___Yuliana_Fresh_Orange_Juice_2_liter.jpg',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       price: 7000,
     }
  ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
