const { Persona, PersonaEdificio, conn: sequelize } = require("../../config/db")


const bcrypt = require("bcrypt");
const saltRounds = 10;

const createPersona = async (personaData) => {
    const transaction = await sequelize.transaction();


    try {
        const { nombre, apellido, telefono, email, rol, activo, edificio_id, dias_trabajo, password } = personaData;

        if (!nombre || !apellido || !telefono || !email || !rol || activo === undefined) {
            throw new Error("Faltan campos obligatorios para crear el usuario")
        }

        // Validar rol válido
        const rolesValidos = ['admin', 'supervisor', 'empleado'];
        if (!rolesValidos.includes(rol)) {
            throw new Error("Rol inválido. Debe ser: admin, supervisor o empleado");
        }

        // Para supervisores, es opcional asignar edificio. Para empleados es obligatorio
        if (rol === 'empleado' && !edificio_id) {
            throw new Error("Debe seleccionar un edificio para empleados")
        }

        console.log("datos correctamente recibidos", personaData);

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newPersona = await Persona.create({
            nombre,
            apellido,
            telefono,
            email,
            rol,
            activo,
            password: hashedPassword
        }, { transaction })

        console.log("Nuevo Cliente creado Id", newPersona.id)

        // Asignar la persona al edificio con sus días de trabajo (solo si es empleado y se proporciona edificio)
        if (rol === 'empleado' && edificio_id && dias_trabajo && dias_trabajo.length > 0) {
            // Crear un registro por cada día de trabajo
            const asignaciones = dias_trabajo.map((dia) => ({
                persona_id: newPersona.id,
                edificio_id,
                dia_semana: dia,
                activo: true
            }));

            await PersonaEdificio.bulkCreate(asignaciones, { transaction });
            console.log("Persona asignada al edificio con días", asignaciones);
        }

        // Para supervisores, asignar a edificio si se proporciona
        if (rol === 'supervisor' && edificio_id) {
            await PersonaEdificio.create({
                persona_id: newPersona.id,
                edificio_id,
                dia_semana: 'todos', // Supervisores trabajan todos los días
                activo: true
            }, { transaction });
            console.log("Supervisor asignado al edificio");
        }

        await transaction.commit();

        return {
            success: true,
            message: "Personal creado y asignado correctamente",
            data: newPersona
        };

    } catch (error) {
        await transaction.rollback();
        console.error("Error en la creacion del cliente", error);
        return { error: error.message }
    }
}

module.exports = createPersona;




