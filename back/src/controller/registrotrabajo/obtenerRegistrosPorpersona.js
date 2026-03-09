const { RegistroTrabajo, Edificio } = require("../../config/db");
const { Op } = require("sequelize");

const obtenerDiasTrabajadosPorPersona = async (personaId, mes, anio) => {
    try {
        if (!personaId || !mes || !anio) {
            throw new Error("personaId, mes y anio son obligatorios");
        }

        const inicio = new Date(anio, mes - 1, 1);
        const fin = new Date(anio, mes, 0);

        const registros = await RegistroTrabajo.findAll({
            where: {
                persona_id: personaId,
                fecha: {
                    [Op.between]: [inicio, fin]
                }
            },
            attributes: ["fecha"],
            order: [["fecha", "ASC"]]
        });

        return registros.map(r => r.fecha);

    } catch (error) {
        console.error("Error al obtener días trabajados", error);
        return { error: error.message };
    }
};

module.exports = obtenerDiasTrabajadosPorPersona;
