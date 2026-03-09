const { EdificioProducto, Edificio, Producto } = require("../../config/db");

const asignarProductoEdificio = async (data) => {
    try {
        const {
            edificio_id,
            producto_id,
            cantidad_actual,
            cantidad_minima
        } = data;

        if (!edificio_id || !producto_id || !cantidad_actual) {
            throw new Error("Faltan campos obligatorios");
        }

        const edificio = await Edificio.findByPk(edificio_id);
        if (!edificio) {
            throw new Error("El edificio no existe");
        }

        const producto = await Producto.findByPk(producto_id);
        if (!producto) {
            throw new Error("El producto no existe");
        }

        const stockDisponible = Number(producto.stock_actual);

        if (cantidad_actual > stockDisponible) {
            throw new Error("No hay suficiente stock disponible");
        }

        // 🔻 Restar del stock general
        const nuevoStock = stockDisponible - Number(cantidad_actual);

        await producto.update({
            stock_actual: nuevoStock
        });

        // 🏢 Crear asignación al edificio
        const asignacion = await EdificioProducto.create({
            edificio_id,
            producto_id,
            cantidad_actual,
            cantidad_minima: cantidad_minima ?? 0
        });

        console.log("Producto asignado al edificio", asignacion.id);

        return asignacion;

    } catch (error) {
        console.error("Error al asignar producto al edificio", error);
        return { error: error.message };
    }
};

module.exports = asignarProductoEdificio;