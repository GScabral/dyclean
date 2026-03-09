const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const RegistroDiaTrabajo = sequelize.define("RegistroDiaTrabajo", {
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
        }
    }, {
        tableName: "registro_dia_trabajo",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["persona_id", "fecha"]
            }
        ]
    });

    return RegistroDiaTrabajo; // ✅ AQUÍ VA EL RETURN
};
