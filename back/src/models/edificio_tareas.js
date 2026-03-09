const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RegistroTarea = sequelize.define('RegistroTarea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    realizada: {
      type: DataTypes.BOOLEAN,
      columnName: 'realizada',
      defaultValue: false,
    },
    inconveniente: {
      type: DataTypes.TEXT,
      columnName: 'inconveniente'
    },
    registro_trabajo_id: {
      type: DataTypes.INTEGER,
      columnName: 'registro_trabajo_id',
      references: {
        model: 'registro_trabajo',
        key: 'id',
      },
      allowNull: false,
    },
    tarea_id: {
      type: DataTypes.INTEGER,
      columnName: 'tarea_id',
      references: {
        model: 'tareas',
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    tableName: 'registro_tareas',
    timestamps: false,
  });

  return RegistroTarea;
};
