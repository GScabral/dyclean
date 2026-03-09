const { RegistroServicio, Persona } = require("../../config/db");
const { Op, fn, col } = require("sequelize");


// 🟢 1️⃣ Crear servicio
const crearRegistroServicio = async (req, res) => {
    try {
        const { persona_id, fecha, tipo_servicio, precio } = req.body;

        if (!persona_id || !fecha || !tipo_servicio || !precio) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios",
            });
        }

        const nuevoServicio = await RegistroServicio.create({
            persona_id,
            fecha,
            tipo_servicio,
            precio,
        });

        return res.status(201).json(nuevoServicio);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear el servicio" });
    }
};


// 🟢 2️⃣ Obtener servicios por persona
const getServiciosPorPersona = async (req, res) => {
    try {
        const { persona_id } = req.params;

        const servicios = await RegistroServicio.findAll({
            where: { persona_id },
            order: [["fecha", "DESC"]],
        });

        return res.status(200).json(servicios);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener servicios" });
    }
};


// 🟢 3️⃣ Total mensual por persona
const getTotalMensual = async (req, res) => {
    try {
        const { persona_id, mes, anio } = req.query;

        if (!persona_id || !mes || !anio) {
            return res.status(400).json({
                error: "persona_id, mes y anio son obligatorios",
            });
        }

        const fechaInicio = `${anio}-${mes}-01`;
        const fechaFin = `${anio}-${mes}-31`;

        const total = await RegistroServicio.findAll({
            attributes: [
                "persona_id",
                [fn("SUM", col("precio")), "total_mensual"],
            ],
            where: {
                persona_id,
                fecha: {
                    [Op.between]: [fechaInicio, fechaFin],
                },
            },
            group: ["persona_id"],
        });

        return res.status(200).json(total);
    } catch (error) {
        return res.status(500).json({ error: "Error al calcular total mensual" });
    }
};


// 🟢 4️⃣ Obtener todos con filtros opcionales
const getAllServicios = async (req, res) => {
    try {
        const { persona_id, mes, anio } = req.query;

        const where = {};

        if (persona_id) where.persona_id = persona_id;

        if (mes && anio) {
            where.fecha = {
                [Op.between]: [`${anio}-${mes}-01`, `${anio}-${mes}-31`],
            };
        }

        const servicios = await RegistroServicio.findAll({
            where,
            include: {
                model: Persona,
                as: "persona",
                attributes: ["id", "nombre", "apellido"],
            },
            order: [["fecha", "DESC"]],
        });

        return res.status(200).json(servicios);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener servicios" });
    }
};


module.exports = {
    crearRegistroServicio,
    getServiciosPorPersona,
    getTotalMensual,
    getAllServicios,
};
