const { PersonaEdificio } = require("../../config/db");

const quitarAsignacion = async (id) => {
    try {
        const asignacion = await PersonaEdificio.findByPk(id);

        if (!asignacion) {
            throw new Error("Asignación no encontrada");
        }

        asignacion.activo = false;
        await asignacion.save();

        return asignacion;

    } catch (error) {
        console.error("Error al quitar asignación", error);
        return { error: error.message };
    }
};

module.exports = quitarAsignacion;
