'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'username tidak boleh kosong'
        },
        isUnique: function (value, next){
          User.findAll({
            where: {
              username: value.toLowerCase(),
              id: {
                [sequelize.Op.ne]: this.id
              }
            }
          }).then((data) => {
            if (data ==null || data.length == 0){
              return next()
            } else{
              return next(`username "${data[0].username}" sudah digunakan`)
            }
          }).catch((err) => {
            return next(err)
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: 'password tidak boleh kosong'
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Order, { onDelete: 'CASCADE' })
    User.belongsToMany(models.Dishes,{through: models.Order})
  };

  User.prototype.comparePassWord = function (passInput , callback) {
    // console.log('iini ke sini',passInput,this.password)
    bcrypt.compare(passInput,this.password).then(result => {
      if (result) {
        callback(result)
      } else {
        callback(result)
      }
    })
  } 

  User.afterBulkDestroy(async (obj,err)=>{
    try {
      await sequelize.models.Order.destroy({
        where: {
          UserId: JSON.parse(obj.where.id)
        }
      })
      // console.log(err)
    }catch (err) {
      console.log(err)
    }
  })
  User.beforeCreate(({dataValues},options)=> {
    return bcrypt.hash(dataValues.password,saltRounds).then(hash=>{
      dataValues.password = hash
    })
  })

  // User.beforeBulkUpdate((dataUser, options)=> {
  //   return bcrypt.hash(dataUser.attributes.password, saltRounds).then(hash => {
  //     dataUser.attributes.password = hash
  //   })
  // })
  return User;
};