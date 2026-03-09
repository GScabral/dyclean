const { RegistroTrabajo } = require("../../config/db");
const { Op } = require("sequelize");

const marcarDiaTrabajado = async (personaId, fecha) => {
    try {
        if (!personaId || !fecha) {
            throw new Error("personaId y fecha son obligatorios");
        }

        // Buscar si ya existe
        const existe = await RegistroTrabajo.findOne({
            where: {
                persona_id: personaId,
                fecha: fecha
            }
        });

        if (existe) {
            return {
                alreadyMarked: true,
                mensaje: "Ese día ya estaba marcado",
                hora: existe.hora_inicio,
            };
        }

        const ahora = new Date();

        const nuevoRegistro = await RegistroTrabajo.create({
            persona_id: personaId,
            fecha,
            hora_inicio: ahora
        });

        // 🔹 traer últimos 5 días
        const ultimosDias = await RegistroTrabajo.findAll({
            where: { persona_id: personaId },
            order: [["fecha", "DESC"]],
            limit: 5,
            attributes: ["fecha", "hora_inicio"]
        });

        return {
            success: true,
            mensaje: "Día marcado correctamente",
            hora: ahora,
            ultimosDias: ultimosDias.map(d => ({
                fecha: d.fecha,
                hora: d.hora_inicio
            }))
        };

    } catch (error) {
        console.error("Error al marcar día trabajado:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = marcarDiaTrabajado;