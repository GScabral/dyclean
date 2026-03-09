const { RegistroTrabajo } = require("../../config/db");
const { Op } = require("sequelize");

const obtenerDiasTrabajados = async (personaId, mes, anio) => {
    try {
        if (!personaId || !mes || !anio) {
            throw new Error("personaId, mes y anio son obligatorios");
        }

        const mesFormateado = mes.toString().padStart(2, "0");

        const inicio = `${anio}-${mesFormateado}-01`;
        const ultimoDia = new Date(anio, mes, 0).getDate();
        const fin = `${anio}-${mesFormateado}-${ultimoDia}`;

        const registros = await RegistroTrabajo.findAll({
            where: {
                persona_id: personaId,
                fecha: {
                    [Op.between]: [inicio, fin]
                }
            },
            order: [["fecha", "ASC"]]
        });

        const dias = registros.map(r => r.fecha);

        return {
            persona_id: personaId,
            mes: mes,
            anio: anio,
            total_dias_trabajados: dias.length,
            dias_trabajados: dias
        };

    } catch (error) {
        console.error("Error al obtener días trabajados:", error);
        return { error: error.message };
    }
};

module.exports = obtenerDiasTrabajados;
