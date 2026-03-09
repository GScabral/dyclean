const { Persona, PersonaEdificio, conn: sequelize } = require("../../config/db");
const bcrypt = require("bcryptjs");

const crearUsuarioEmpleado = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const {
            nombre,
            apellido,
            email,
            cedula,
            telefono,
            password,
            rol,
            edificio_id,
            dias_trabajo,
            activo
        } = req.body;

        // 🔎 Validaciones básicas
        if (!nombre || !email || !cedula || !telefono || !password) {
            await transaction.rollback();
            return res.status(400).json({
                error: "Faltan campos obligatorios: nombre, email, cedula, telefono, password"
            });
        }

        // Validar rol
        const rolesValidos = ["admin", "supervisor", "empleado"];
        const rolFinal = rol || "empleado";
        
        if (!rolesValidos.includes(rolFinal)) {
            await transaction.rollback();
            return res.status(400).json({
                error: `Rol inválido. Debe ser: ${rolesValidos.join(", ")}`
            });
        }

        // Validar que empleado tenga edificio asignado
        if (rolFinal === "empleado" && !edificio_id) {
            await transaction.rollback();
            return res.status(400).json({
                error: "Los empleados requieren un edificio asignado"
            });
        }

        // Validar días de trabajo si se proporcionan
        const diasValidos = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        if (dias_trabajo && Array.isArray(dias_trabajo)) {
            const diasInvalidos = dias_trabajo.filter(dia => !diasValidos.includes(dia));
            if (diasInvalidos.length > 0) {
                await transaction.rollback();
                return res.status(400).json({
                    error: `Días inválidos: ${diasInvalidos.join(", ")}. Usa: ${diasValidos.join(", ")}`
                });
            }
        }

        // Email único
        const existeEmail = await Persona.findOne({ where: { email }, transaction });
        if (existeEmail) {
            await transaction.rollback();
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        // Cédula única
        const existeCedula = await Persona.findOne({ where: { cedula }, transaction });
        if (existeCedula) {
            await transaction.rollback();
            return res.status(400).json({ error: "La cédula ya está registrada" });
        }

        // 🔐 Hash de contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 👤 Crear persona
        const nuevaPersona = await Persona.create({
            nombre,
            apellido,
            email,
            cedula,
            telefono,
            password: passwordHash,
            rol: rolFinal,
            activo: activo !== undefined ? activo : true,
        }, { transaction });

        // 🏢 Asignar edificio solo si es empleado o si supervisor tiene edificio asignado
        if ((rolFinal === "empleado" || (rolFinal === "supervisor" && edificio_id)) && edificio_id) {
            // Verificar si ya existe una asignación para esta persona-edificio
            const asignacionExistente = await PersonaEdificio.findOne({
                where: { persona_id: nuevaPersona.id, edificio_id },
                transaction
            });

            if (!asignacionExistente) {
                // Usar días proporcionados o default de lunes a viernes
                const diasParaAsignar = (Array.isArray(dias_trabajo) && dias_trabajo.length > 0)
                    ? dias_trabajo
                    : ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

                const asignaciones = diasParaAsignar.map((dia) => ({
                    persona_id: nuevaPersona.id,
                    edificio_id,
                    dia_semana: dia,
                }));

                await PersonaEdificio.bulkCreate(asignaciones, { transaction });
            }
        }

        const mensajePorRol = {
            "admin": "Administrador creado correctamente",
            "supervisor": "Supervisor creado correctamente",
            "empleado": "Empleado creado correctamente"
        };

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: mensajePorRol[rolFinal],
            usuario: {
                id: nuevaPersona.id,
                nombre: nuevaPersona.nombre,
                apellido: nuevaPersona.apellido,
                email: nuevaPersona.email,
                rol: nuevaPersona.rol,
                cedula: nuevaPersona.cedula,
            },
        });

    } catch (error) {
        await transaction.rollback();
        console.error("Error crear usuario:", error);
        res.status(500).json({
            error: "Error interno",
            details: error.message,
        });
    }
};

module.exports = crearUsuarioEmpleado;
