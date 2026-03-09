const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Horario = sequelize.define('Horario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hora_inicio: {
      type: DataTypes.TIME,
    },
    hora_fin: {
      type: DataTypes.TIME,
    },
  }, {
    tableName: 'horarios',
    timestamps: false,
  });

  return Horario;
};
