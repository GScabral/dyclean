const { Tarea } = require("../../config/db");

const listarTareasActivas = async () => {
    try {
        const tareas = await Tarea.findAll({
            where: { activo: true }
        });

        return tareas;

    } catch (error) {
        console.error("Error al listar tareas activas", error);
        return { error: error.message };
    }
};

module.exports = listarTareasActivas;
