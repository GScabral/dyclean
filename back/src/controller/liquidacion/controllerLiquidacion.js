const { Liquidacion, RegistroServicio, Persona, RegistroTrabajo } = require("../../config/db");
const { Op, fn, col } = require("sequelize");


// 🔹 Generar liquidación mensual
const generarLiquidacion = async (req, res) => {
    try {

        const { persona_id, mes, anio, precio_dia } = req.body;

        if (!precio_dia || precio_dia <= 0) {
            return res.status(400).json({
                error: "Debe ingresar un precio por día válido"
            });
        }

        const inicio = new Date(anio, mes - 1, 1);
        const fin = new Date(anio, mes, 0);

        const totalDias = await RegistroTrabajo.count({
            where: {
                persona_id,
                fecha: {
                    [Op.between]: [inicio, fin]
                }
            }
        });

        const totalServicios = await RegistroServicio.sum("precio", {
            where: {
                persona_id,
                fecha: {
                    [Op.between]: [inicio, fin]
                }
            }
        });

        const total =
            (totalDias * precio_dia) +
            (totalServicios || 0);

        const liquidacion = await Liquidacion.create({
            persona_id,
            mes,
            anio,
            precio_dia,
            total,
            estado: "pendiente",
            fecha_generada: new Date()
        });

        res.json({
            ...liquidacion.dataValues,
            totalDias,
            totalServicios: totalServicios || 0
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 🔹 Obtener todas las liquidaciones
const getLiquidaciones = async (req, res) => {
    try {
        const liquidaciones = await Liquidacion.findAll({
            include: [
                {
                    model: Persona,
                    attributes: ["id", "nombre", "email"],
                }
            ],
            order: [["fecha_generada", "DESC"]],
        });
        res.status(200).json(liquidaciones);

    } catch (error) {
        console.error("Error en getLiquidaciones:", error);
        res.status(500).json({ error: error.message });
    }
};
// 🔹 Marcar como pagado
const marcarComoPagado = async (req, res) => {
    try {
        const { id } = req.params;

        await Liquidacion.update(
            { estado: "pagado" },
            { where: { id } }
        );

        res.json({ mensaje: "Pago registrado correctamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar estado" });
    }
};


module.exports = {
    generarLiquidacion,
    getLiquidaciones,
    marcarComoPagado,
};
