const { EdificioProducto, Edificio, Producto } = require("../../config/db");

const obtenerProductosPorEdificio = async () => {
    try {

        const edificios = await Edificio.findAll({
            attributes: ["id", "nombre", "direccion", "activo"],
            include: {
                model: EdificioProducto,
                attributes: [
                    "id",               // 👈 MUY IMPORTANTE
                    "cantidad_actual",
                    "cantidad_minima",
                    "producto_id",
                    "edificio_id",
                    "createdAt",
                    "updatedAt"
                ],
                include: {
                    model: Producto,
                    attributes: ["id", "nombre", "unidad"]
                }
            }
        });

        return edificios;

    } catch (error) {
        console.error("Error al obtener productos por edificio", error);
        return { error: error.message };
    }
};

module.exports = obtenerProductosPorEdificio;