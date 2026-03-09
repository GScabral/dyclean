const { EdificioProducto, Producto } = require("../../config/db");

const desasignarProductoEdificio = async (idAsignacion) => {
    try {

        const asignacion = await EdificioProducto.findByPk(idAsignacion);

        if (!asignacion) {
            throw new Error("Asignación no encontrada");
        }

        const producto = await Producto.findByPk(asignacion.producto_id);

        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        // devolver stock al producto
        const nuevoStock = Number(producto.stock_actual) + Number(asignacion.cantidad_actual);

        await producto.update({
            stock_actual: nuevoStock
        });

        // eliminar asignación
        await asignacion.destroy();

        return { message: "Producto desasignado correctamente" };

    } catch (error) {
        console.error("Error al desasignar producto", error);
        return { error: error.message };
    }
};

module.exports = desasignarProductoEdificio;

