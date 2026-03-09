const { PersonaEdificio, Persona, Edificio } = require("../../config/db");

const listarAsignacion = async () => {
    try {
        const asignaciones = await PersonaEdificio.findAll({
            include: [
                { model: Persona, attributes: ["nombre", "apellido"] },
                { model: Edificio, attributes: ["nombre", "direccion"] }
            ]
        });

        return asignaciones;

    } catch (error) {
        console.error("Error al listar asignaciones", error);
        return { error: error.message };
    }
};

module.exports = listarAsignacion;
