const { Horario, Persona } = require("../../config/db");

const obtenerHorarioPorPersona = async (persona_id) => {
    try {
        if (!persona_id) {
            throw new Error("El id de la persona es obligatorio");
        }

        const persona = await Persona.findByPk(persona_id);
        if (!persona) {
            throw new Error("La persona no existe");
        }

        const horarios = await Horario.findAll({
            where: { persona_id }
        });

        return horarios;

    } catch (error) {
        console.error("Error al obtener horarios", error);
        return { error: error.message };
    }
};

module.exports = obtenerHorarioPorPersona;
