const { RegistroTrabajo, Persona, Edificio } = require("../../config/db");

const obtenerRegistrodiario = async (personaId, fecha) => {
    try {
        if (!personaId) {
            throw new Error("El id de la persona es obligatorio");
        }

        const whereClause = { persona_id: personaId };
        
        if (fecha) {
            whereClause.fecha = fecha;
        } else {
            // Si no se proporciona fecha, usar la de hoy
            const fechaHoy = new Date().toISOString().split('T')[0];
            whereClause.fecha = fechaHoy;
        }

        const registros = await RegistroTrabajo.findAll({
            where: whereClause,
            include: [
                {
                    model: Persona,
                    attributes: ["nombre", "apellido", "email"]
                },
                {
                    model: Edificio,
                    attributes: ["nombre", "direccion"]
                }
            ],
            order: [["fecha", "DESC"]]
        });

        return registros;

    } catch (error) {
        console.error("Error al obtener registro diario", error);
        return { error: error.message };
    }
};

module.exports = obtenerRegistrodiario;
