const { RegistroTrabajo } = require("../../config/db");
const { Op } = require("sequelize");

const getAllRegistroDiaTrabajo = async (personaId, mes, anio) => {
    try {
        let whereCondition = {};

        // 🔹 Filtro por persona (opcional)
        if (personaId) {
            whereCondition.persona_id = personaId;
        }

        // 🔹 Filtro por mes y año (opcional)
        if (mes && anio) {
            const mesFormateado = mes.toString().padStart(2, "0");
            const ultimoDia = new Date(anio, mes, 0).getDate();

            const inicio = `${anio}-${mesFormateado}-01`;
            const fin = `${anio}-${mesFormateado}-${ultimoDia}`;

            whereCondition.fecha = {
                [Op.between]: [inicio, fin]
            };
        }

        const registros = await RegistroTrabajo.findAll({
            where: whereCondition,
            order: [["fecha", "ASC"]]
        });

        return {
            total_registros: registros.length,
            registros
        };

    } catch (error) {
        console.error("Error en getAllRegistroDiaTrabajo:", error);
        return { error: error.message };
    }
};

module.exports = getAllRegistroDiaTrabajo;
