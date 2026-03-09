module.exports = (sequelize, DataTypes) => {
    const StockMovimiento = sequelize.define(
        "StockMovimiento",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            producto_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            edificio_id: {
                type: DataTypes.INTEGER
            },

            tipo_movimiento: {
                type: DataTypes.ENUM("INGRESO", "EGRESO", "AJUSTE"),
                allowNull: false
            },

            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            descripcion: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "StockMovimiento",

            timestamps: true,

            createdAt: "created_at",

            updatedAt: false
        }
    );

    return StockMovimiento;
};