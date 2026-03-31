const { PersonaEdificio, Persona, Edificio } = require("../../config/db");


const asignarEmpleadoEdificio = async (data) => {
    try {
        const { persona_id, edificio_id, dias_semana, activo } = data;

        if (!persona_id || !edificio_id || !dias_semana || !Array.isArray(dias_semana) || dias_semana.length === 0) {
            throw new Error("Faltan campos obligatorios o días inválidos");
        }

        const persona = await Persona.findByPk(persona_id);
        if (!persona) throw new Error("La persona no existe");

        const edificio = await Edificio.findByPk(edificio_id);
        if (!edificio) throw new Error("El edificio no existe");

        // Crear una asignación por cada día
        const asignaciones = await Promise.all(
            dias_semana.map(dia =>
                PersonaEdificio.create({
                    persona_id,
                    edificio_id,
                    dia_semana: dia,
                    activo: activo ?? true
                })
            )
        );

        return asignaciones;

    } catch (error) {
        console.error("Error al asignar empleado al edificio", error);
        return { error: error.message };
    }
};

module.exports = asignarEmpleadoEdificio;
