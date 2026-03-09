const { RegistroTrabajo } = require("../../config/db");

const iniciarJornada = async (data) => {
    try {
        const { persona_id, edificio_id } = data;

        if (!persona_id || !edificio_id) {
            throw new Error("Faltan campos obligatorios: persona_id, edificio_id");
        }

        // Verificar si ya hay una jornada activa hoy
        const fechaHoy = new Date().toISOString().split('T')[0];
        const jornadadaActiva = await RegistroTrabajo.findOne({
            where: {
                persona_id,
                edificio_id,
                fecha: fechaHoy,
            }
        });

        if (jornadadaActiva && !jornadadaActiva.hora_fin) {
            return { error: "La persona ya tiene una jornada activa" };
        }

        const nuevoRegistro = await RegistroTrabajo.create({
            persona_id,
            edificio_id,
            fecha: fechaHoy,
            hora_inicio: new Date(),
            horas_totales: 0
        });

        console.log("Jornada iniciada correctamente", nuevoRegistro.id);
        return nuevoRegistro;

    } catch (error) {
        console.error("Error al iniciar jornada", error);
        return { error: error.message };
    }
};

module.exports = iniciarJornada;
