const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Edificio = sequelize.define('Edificio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    telefono_contacto: {
      type: DataTypes.STRING(30),
    },

    email_contacto: {
      type: DataTypes.STRING(100),
    },

    encargado: {
      type: DataTypes.STRING(100),
    },

    latitud: {
      type: DataTypes.DECIMAL(10, 8),
    },

    longitud: {
      type: DataTypes.DECIMAL(11, 8),
    },

    frecuencia_limpieza: {
      type: DataTypes.STRING(50),
    },


    litros_estimados: {
      type: DataTypes.DECIMAL(6, 2),
    },

    duracion_estimada_minutos: {
      type: DataTypes.INTEGER,
    },

    metros_cuadrados: {
      type: DataTypes.INTEGER,
    },

    cantidad_pisos: {
      type: DataTypes.INTEGER,
    },

    horario_preferido: {
      type: DataTypes.STRING(50),
    },

    fecha_ultimo_servicio: {
      type: DataTypes.DATE,
    },

    observaciones: {
      type: DataTypes.TEXT,
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
    },

  }, {
    tableName: 'edificios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return Edificio;
};