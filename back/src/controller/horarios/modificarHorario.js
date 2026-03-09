const { Horario } = require("../../config/db");

const modificarHorario = async (horarioId, data) => {
    try {
        const { hora_inicio, hora_fin } = data;

        const horario = await Horario.findByPk(horarioId);
        if (!horario) {
            throw new Error("El horario no existe");
        }

        await horario.update({
            hora_inicio: hora_inicio ?? horario.hora_inicio,
            hora_fin: hora_fin ?? horario.hora_fin
        });

        console.log("Horario modificado correctamente");
        return horario;

    } catch (error) {
        console.error("Error al modificar horario", error);
        return { error: error.message };
    }
};

module.exports = modificarHorario;
