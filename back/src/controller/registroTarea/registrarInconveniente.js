const { RegistroTarea } = require("../../config/db");

const registrarInconveniente = async (id, inconveniente) => {
    try {
        const tarea = await RegistroTarea.findByPk(id);

        if (!tarea) {
            throw new Error("Registro de tarea no encontrado");
        }

        tarea.inconveniente = inconveniente;
        await tarea.save();

        return tarea;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = registrarInconveniente;
