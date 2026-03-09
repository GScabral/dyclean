const { PersonaEdificio, Persona, Edificio } = require("../../config/db");

const asignarEmpleadoEdificio = async (data) => {
    try {
        const { persona_id, edificio_id, activo } = data;

        if (!persona_id || !edificio_id) {
            throw new Error("Faltan campos obligatorios");
        }

        const persona = await Persona.findByPk(persona_id);
        if (!persona) throw new Error("La persona no existe");

        const edificio = await Edificio.findByPk(edificio_id);
        if (!edificio) throw new Error("El edificio no existe");

        const asignacion = await PersonaEdificio.create({
            persona_id,
            edificio_id,
            activo: activo ?? true
        });

        return asignacion;

    } catch (error) {
        console.error("Error al asignar empleado al edificio", error);
        return { error: error.message };
    }
};

module.exports = asignarEmpleadoEdificio;
