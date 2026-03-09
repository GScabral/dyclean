// models/Reporte.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Reporte", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        tipo: {
            type: DataTypes.ENUM(
                "infraestructura",
                "limpieza",
                "producto",
                "tarea",
                "otro"
            ),
            allowNull: false
        },

        estado: {
            type: DataTypes.ENUM("pendiente", "en_proceso", "resuelto"),
            defaultValue: "pendiente"
        }
    }, {
        tableName: "reportes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
};
