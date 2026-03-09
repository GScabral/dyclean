const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RegistroTrabajo = sequelize.define("RegistroTrabajo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    hora_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    hora_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    horas_totales: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  }, {
    tableName: "registro_trabajo",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: 'updated_at',

    indexes: [
      {
        unique: true,
        fields: ["persona_id", "fecha"]
      }
    ]
  });

  return RegistroTrabajo;
};