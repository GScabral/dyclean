const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tarea = sequelize.define('Tarea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    prioritaria: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'tareas',
    timestamps: false,
  });

  return Tarea;
};
