const { Persona, PersonaEdificio, Edificio } = require("../../config/db");

const crearPersonaConEdificio = async (data) => {
    try {
        const {
            nombre,
            apellido,
            telefono,
            email,
            rol,
            activo,
            edificio_id,
            dias // array → ["Lunes", "Miercoles"]
        } = data;

        if (!nombre || !apellido || !telefono || !email || !rol || !edificio_id || !dias?.length) {
            throw new Error("Faltan campos obligatorios");
        }

        // 1️⃣ Crear persona
        const nuevaPersona = await Persona.create({
            nombre,
            apellido,
            telefono,
            email,
            rol,
            activo: activo ?? true,
        });

        // 2️⃣ Verificar edificio
        const edificio = await Edificio.findByPk(edificio_id);
        if (!edificio) {
            throw new Error("El edificio no existe");
        }

        // 3️⃣ Asignar días al edificio
        const asignaciones = await Promise.all(
            dias.map((dia) =>
                PersonaEdificio.create({
                    personaId: nuevaPersona.id,
                    edificioId: edificio_id,
                    diaSemana: dia,
                    activo: true,
                })
            )
        );

        return {
            persona: nuevaPersona,
            asignaciones,
        };

    } catch (error) {
        console.error("Error al crear persona con edificio", error);
        return { error: error.message };
    }
};

module.exports = crearPersonaConEdificio;
