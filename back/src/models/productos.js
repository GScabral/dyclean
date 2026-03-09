const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    unidad: {
      type: DataTypes.STRING(20),
    },
    stock_actual: {
      type: DataTypes.DECIMAL(8, 2),
    },
    stock_minimo: {
      type: DataTypes.DECIMAL(8, 2),
    },
  }, {
    tableName: 'productos',
    timestamps: true,      
    underscored: true
  });

  return Producto;
};
