const { StockMovimiento, Producto, Edificio } = require("../../config/db");

const obtenerHistorialStock = async () => {

    try {

        const historial = await StockMovimiento.findAll({

            include: [
                {
                    model: Producto,
                    attributes: ["nombre", "unidad"]
                },
                {
                    model: Edificio,
                    attributes: ["nombre"]
                }
            ],

            order: [["created_at", "DESC"]]

        });

        return historial;

    } catch (error) {

        console.error("Error historial stock", error);

        return { error: error.message };

    }
};

module.exports = obtenerHistorialStock;