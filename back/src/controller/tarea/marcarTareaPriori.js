const { Tarea } = require("../../config/db");

const marcarTareaPrioritaria = async (tareaId, prioritaria) => {
    try {
        const tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            throw new Error("La tarea no existe");
        }

        await tarea.update({
            prioritaria
        });

        console.log("Tarea marcada como prioritaria:", prioritaria);
        return tarea;

    } catch (error) {
        console.error("Error al marcar tarea prioritaria", error);
        return { error: error.message };
    }
};

module.exports = marcarTareaPrioritaria;
