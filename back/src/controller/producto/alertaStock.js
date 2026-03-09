const { EdificioProducto, Producto, Edificio } = require("../../config/db");
const { Op, col } = require("sequelize");

const alertasStock = async () => {
    const alertas = await EdificioProducto.findAll({
        where: {
            cantidad_actual: { [Op.lt]: col("cantidad_minima") }
        },
        include: [
            { model: Producto, attributes: ["nombre"] },
            { model: Edificio, attributes: ["nombre"] }
        ]
    });

    return alertas.map(a => ({
        edificio: a.Edificio.nombre,
        producto: a.Producto.nombre,
        actual: a.cantidad_actual,
        minimo: a.cantidad_minima
    }));
};

module.exports = alertasStock;
