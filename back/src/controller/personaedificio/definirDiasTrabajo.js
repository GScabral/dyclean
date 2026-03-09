const { PersonaEdificio } = require("../../config/db");

const definirDiasTrabajo = async (data) => {
    try {
        const { persona_edificio_id, dia_semana } = data;

        if (!persona_edificio_id || !dia_semana) {
            throw new Error("Faltan campos obligatorios");
        }

        const asignacion = await PersonaEdificio.findByPk(persona_edificio_id);
        if (!asignacion) {
            throw new Error("Asignación no encontrada");
        }

        asignacion.dia_semana = dia_semana;
        await asignacion.save();

        return asignacion;

    } catch (error) {
        console.error("Error al definir días de trabajo", error);
        return { error: error.message };
    }
};

module.exports = definirDiasTrabajo;
