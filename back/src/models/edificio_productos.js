const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EdificioProducto = sequelize.define('EdificioProducto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    edificio_id: {
      type: DataTypes.INTEGER,
      columnName: 'edificio_id'
    },
    producto_id: {
      type: DataTypes.INTEGER,
      columnName: 'producto_id'
    },
    cantidad_actual: {
      type: DataTypes.DECIMAL(8, 2),
      columnName: 'cantidad_actual'
    },
    cantidad_minima: {
      type: DataTypes.DECIMAL(8, 2),
      columnName: 'cantidad_minima'
    },
  }, {
    tableName: 'edificio_productos',
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  });

  return EdificioProducto;
};
