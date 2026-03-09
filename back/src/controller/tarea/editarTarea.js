const { Tarea } = require("../../config/db");

const editarTarea = async (tareaId, data) => {
    try {
        const tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            throw new Error("La tarea no existe");
        }

        await tarea.update({
            nombre: data.nombre ?? tarea.nombre,
            descripcion: data.descripcion ?? tarea.descripcion,
            prioritaria: data.prioritaria ?? tarea.prioritaria,
            activo: data.activo ?? tarea.activo
        });

        console.log("Tarea actualizada correctamente");
        return tarea;

    } catch (error) {
        console.error("Error al editar tarea", error);
        return { error: error.message };
    }
};

module.exports = editarTarea;
