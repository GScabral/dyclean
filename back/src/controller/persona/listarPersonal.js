const {
    Persona,
    PersonaEdificio,
    Edificio,
    Horario
} = require("../../config/db");

const listPersona = async () => {
    try {
        const listaPersonal = await Persona.findAll({
            include: [
                {
                    model: Edificio,
                    through: { attributes: [] },
                    attributes: ["id", "nombre", "direccion"]
                }
            ]
        });

        return listaPersonal;

    } catch (error) {
        console.error("Error al obtener el personal", error);
        throw error;
    }
};

module.exports = listPersona;
