const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PersonaEdificio = sequelize.define('PersonaEdificio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    persona_id: {
      type: DataTypes.INTEGER,
      columnName: 'persona_id',
      references: {
        model: 'personas',
        key: 'id',
      },
      allowNull: false,
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
    dia_semana: {
      type: DataTypes.STRING(15),
      columnName: 'dia_semana',
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      columnName: 'activo',
      defaultValue: true,
    },
  }, {
    tableName: 'persona_edificio',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['persona_id', 'edificio_id', 'dia_semana'],
        name: 'persona_edificio_unique_constraint'
      }
    ]
  });

  return PersonaEdificio;
};
