const { Edificio, Persona, PersonaEdificio } = require("../../config/db");

const detallePersona = async (personaId) => {

    // 🔎 Validación
    if (!personaId) {
        throw new Error("El id de la persona es obligatorio");
    }

    // 👤 Buscar persona con edificios y días
    const persona = await Persona.findByPk(personaId, {
        attributes: {
            exclude: ["password"]
        },
        include: [
            {
                model: Edificio,
                through: {
                    model: PersonaEdificio,
                    attributes: ["id", "dia_semana", "activo"]
                }
            }
        ]
    });

    // ❌ No existe
    if (!persona) {
        throw new Error("La persona no existe");
    }

    // ✅ Retornar datos
    return persona;
};

module.exports = detallePersona;
