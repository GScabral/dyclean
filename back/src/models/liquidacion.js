// models/Liquidacion.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Liquidacion = sequelize.define(
        "Liquidacion",
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
            mes: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            anio: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
            },
            estado: {
                type: DataTypes.ENUM("pendiente", "pagado"),
                defaultValue: "pendiente",
            },
            fecha_generada: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "liquidaciones",
            timestamps: false,
        }
    );

    return Liquidacion;
};
