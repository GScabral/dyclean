const { Producto } = require("../../config/db");

const actualizarStock = async (productoId, data) => {
    try {
        const { stock_actual } = data;

        if (!productoId || stock_actual === undefined) {
            throw new Error("Faltan datos obligatorios");
        }

        const producto = await Producto.findByPk(productoId);

        if (!producto) {
            throw new Error("El producto no existe");
        }

        await producto.update({
            stock_actual
        });

        console.log("Stock actualizado correctamente");
        return producto;

    } catch (error) {
        console.error("Error al actualizar stock", error);
        return { error: error.message };
    }
};

module.exports = actualizarStock;
