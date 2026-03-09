const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EdificioTareaAsignacion = sequelize.define('EdificioTareaAsignacion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    edificio_id: {
      type: DataTypes.INTEGER,
      columnName: 'edificio_id',
      references: {
        model: 'edificios',
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
    tableName: 'edificio_tareas',
    timestamps: false,
  });

  return EdificioTareaAsignacion;
};
