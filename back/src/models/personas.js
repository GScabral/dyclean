const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Persona = sequelize.define('Persona', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(80),
    },
    apellido: {
      type: DataTypes.STRING(80),
    },
    telefono: {
      type: DataTypes.STRING(30),
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      unique: true,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'supervisor', 'empleado'),
      defaultValue: 'empleado'
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    cedula: {
      type: DataTypes.STRING(30),
      unique: true,
    },
  }, {
    tableName: 'personas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return Persona;
};
