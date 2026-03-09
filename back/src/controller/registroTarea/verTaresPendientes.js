const { RegistroTarea, Tarea, RegistroTrabajo } = require("../../config/db");

const verTareasPendientes = async (personaId) => {
    try {
        const registros = await RegistroTarea.findAll({
            where: {
                realizada: false
            },
            include: [
                {
                    model: RegistroTrabajo,
                    required: true,  // inner join para filtrar por persona_id
                    where: {
                        persona_id: personaId
                    },
                    attributes: []   // no necesitamos campos de RegistroTrabajo en la respuesta
                },
                {
                    model: Tarea,
                    // traer todos los campos de la tarea para poder reutilizar el mismo objeto en el frontend
                }
            ]
        });

        // devolver sólo el objeto de tarea para simplificar el consumo
        return registros.map(r => r.Tarea);
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = verTareasPendientes;
