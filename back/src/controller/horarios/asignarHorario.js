const { Horario, Persona } = require("../../config/db");

const asignarHorarios = async (data) => {
    try {
        const { persona_id, hora_inicio, hora_fin } = data;

        if (!persona_id || !hora_inicio || !hora_fin) {
            throw new Error("Faltan campos obligatorios");
        }

        const persona = await Persona.findByPk(persona_id);
        if (!persona) {
            throw new Error("La persona no existe");
        }

        const nuevoHorario = await Horario.create({
            persona_id,
            hora_inicio,
            hora_fin
        });

        console.log("Horario asignado correctamente", nuevoHorario.id);
        return nuevoHorario;

    } catch (error) {
        console.error("Error al asignar horario", error);
        return { error: error.message };
    }
};

module.exports = asignarHorarios;
