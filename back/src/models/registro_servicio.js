const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RegistroServicio = sequelize.define(
    "RegistroServicio",
    {
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
      tipo_servicio: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "registro_servicio",
      timestamps: false, // porque tu tabla no tiene created_at ni updated_at
    }
  );

  return RegistroServicio;
};
