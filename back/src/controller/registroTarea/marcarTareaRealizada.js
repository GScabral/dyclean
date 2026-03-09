const { RegistroTarea } = require("../../config/db");

const marcarTareaRealizada = async (id, realizada = true) => {
    try {
        const tarea = await RegistroTarea.findByPk(id);

        if (!tarea) {
            throw new Error("Registro de tarea no encontrado");
        }

        tarea.realizada = realizada;
        await tarea.save();

        return tarea;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = marcarTareaRealizada;
