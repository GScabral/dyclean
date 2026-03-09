const { EdificioProducto, Producto, Edificio } = require("../../config/db");
const { Op } = require("sequelize");

const productosFaltantes = async () => {
    try {
        const faltantes = await EdificioProducto.findAll({
            where: {
                cantidad_actual: {
                    [Op.lt]: sequelize.col("cantidad_minima")
                }
            },
            include: [
                {
                    model: Producto,
                    attributes: ["nombre", "unidad"]
                },
                {
                    model: Edificio,
                    attributes: ["nombre", "direccion"]
                }
            ]
        });

        return faltantes;

    } catch (error) {
        console.error("Error al obtener productos faltantes", error);
        return { error: error.message };
    }
};

module.exports = productosFaltantes;
