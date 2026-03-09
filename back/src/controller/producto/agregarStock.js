const { Producto, StockMovimiento } = require("../../config/db");

const agregarStock = async (req, res) => {

    try {

        const { producto_id, cantidad, motivo } = req.body;

        const producto = await Producto.findByPk(producto_id);

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // registrar movimiento
        await StockMovimiento.create({
            producto_id,
            tipo_movimiento: "INGRESO",
            cantidad,
            motivo
        });

        // actualizar stock
        await producto.increment("stock_actual", { by: cantidad });

        res.json({ message: "Stock agregado correctamente" });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al agregar stock"
        });

    }

};

module.exports = agregarStock;