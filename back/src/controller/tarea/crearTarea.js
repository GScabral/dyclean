const { Tarea } = require("../../config/db");

const crearTarea = async (data) => {
    try {
        // Log incoming payload for debugging
        console.log("crearTarea recibio datos:", data);
        const { nombre, descripcion, prioritaria, activo } = data;

        if (!nombre) {
            throw new Error("El nombre de la tarea es obligatorio");
        }

        const nuevaTarea = await Tarea.create({
            nombre,
            descripcion,
            prioritaria: prioritaria ?? false,
            activo: activo ?? true
        });

        // Log the complete task object, not just the id
        console.log("Tarea creada correctamente", nuevaTarea.toJSON());
        return nuevaTarea;

    } catch (error) {
        console.error("Error al crear tarea", error);
        return { error: error.message };
    }
};

module.exports = crearTarea;
