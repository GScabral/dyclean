const { Reporte } = require("../../config/db");

const actualizarEstadoReporte = async (req, res) => {
    try {
        const { id } = req.params; // id del reporte
        const { estado } = req.body; // nuevo estado

        // Validar estado permitido
        const estadosValidos = ["pendiente", "en_proceso", "resuelto"];

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ error: "Estado inválido" });
        }

        // Buscar reporte
        const reporte = await Reporte.findByPk(id);

        if (!reporte) {
            return res.status(404).json({ error: "Reporte no encontrado" });
        }

        // Actualizar solo el estado
        reporte.estado = estado;
        await reporte.save();

        return res.json({
            message: "Estado actualizado correctamente",
            reporte
        });

    } catch (error) {
        console.error("Error al actualizar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = actualizarEstadoReporte
