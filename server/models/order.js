'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    UserId: DataTypes.INTEGER,
    DishId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    cookDuration: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Dishes, {
      foreignKeyConstraint: true
      , onDelete: 'CASCADE'
    })
    Order.belongsTo(models.User, {
      foreignKeyConstraint: true
      , onDelete: 'CASCADE'
    })
  };
  return Order;
};