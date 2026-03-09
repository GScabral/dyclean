const { RegistroTrabajo } = require("../../config/db");

const iniciarJornada = async (persona_id, edificio_id) => {
    try {
        return await RegistroTrabajo.create({
            persona_id,
            edificio_id,
            fecha: new Date(),
            hora_inicio: new Date()
        });
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = iniciarJornada;
