const { Edificio } = require("../../config/db");

const editarDatosEdificio = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            direccion,
            frecuencia_limpieza,
            litros_estimados,
            duracion_estimada_minutos,
            activo
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "El id del edificio es obligatorio" });
        }

        // Buscar edificio
        const edificio = await Edificio.findByPk(id);

        if (!edificio) {
            return res.status(404).json({ error: "Edificio no encontrado" });
        }

        // Actualizar solo los campos enviados
        await edificio.update({
            nombre: nombre ?? edificio.nombre,
            direccion: direccion ?? edificio.direccion,
            frecuencia_limpieza: frecuencia_limpieza ?? edificio.frecuencia_limpieza,
            litros_estimados: litros_estimados ?? edificio.litros_estimados,
            duracion_estimada_minutos:
                duracion_estimada_minutos ?? edificio.duracion_estimada_minutos,
            activo: activo ?? edificio.activo
        });

        return res.status(200).json({
            message: "Edificio actualizado correctamente",
            edificio
        });

    } catch (error) {
        console.error("Error al editar el edificio:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    editarDatosEdificio
};
