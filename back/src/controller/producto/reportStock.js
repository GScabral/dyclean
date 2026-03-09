// controller/reportes/alertaProducto.js
const { Reporte, Producto, Edificio } = require("../../config/db");

const alertaProducto = async (req, res) => {
    try {
        const { producto_id, edificio_id, persona_id } = req.body;

        console.log("producto_id recibido:", producto_id);
        const producto = await Producto.findByPk(producto_id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const edificio = await Edificio.findByPk(edificio_id);
        if (!edificio) {
            return res.status(404).json({ error: "Edificio no encontrado" });
        }

        const descripcion = `Stock bajo del producto: ${producto.nombre}`;

        const reporte = await Reporte.create({
            descripcion,
            tipo: "producto",
            PersonaId: persona_id,
            EdificioId: edificio_id
        });

        res.status(201).json({
            success: true,
            reporte
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al enviar alerta" });
    }
};

module.exports = alertaProducto;
