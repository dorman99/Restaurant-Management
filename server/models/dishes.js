'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dishes = sequelize.define('Dishes', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Field Tidak Boleh Kosong'
        },
        isUnique: function (value, next){
        Dishes.findAll({
         where: {
        name: value.toLowerCase(),
        id: {
          [sequelize.Op.ne]: this.id
        }
      }
        }).then((data) =>{
          if (data == null || data.length ==0){
            return next()
          } else {
            return next(`Menu Sudah Terdaftar`)
          }
        }).catch((err) =>{
          return next(err)
          })
        }
      }
    },
    cookDuration: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Durasi Masak Tidak Boleh Kosong'
        }
      }
    },
    stock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Gambar Makanan Harus Tersedia'
        }
      }
    },
    desc: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Deskripsi Tidak Boleh Kosong'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Harga Tidak Boleh Kosong'
        }
      }
    }
  }, {});
  Dishes.associate = function(models) {
    Dishes.hasMany(models.Order, { onDelete: 'CASCADE' })
    Dishes.belongsToMany(models.User, {through: models.Order})
  };
  return Dishes;
};