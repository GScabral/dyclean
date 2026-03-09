const {
    Edificio,
    Persona,
    PersonaEdificio,
    Producto,
    EdificioProducto,
    Tarea,
    EdificioTareaAsignacion,
    RegistroTrabajo
} = require("../../config/db");

const detallesEdificio = async (edificioId) => {
    try {
        if (!edificioId) {
            throw new Error("El id del edificio es obligatorio");
        }

        // 🏢 Edificio con TODOS los campos nuevos
        const edificio = await Edificio.findByPk(edificioId, {
            attributes: [
                "id",
                "nombre",
                "direccion",
                "frecuencia_limpieza",
                "litros_estimados",
                "duracion_estimada_minutos",
                "activo",

                "telefono_contacto",
                "email_contacto",
                "encargado",
                "latitud",
                "longitud",
                "metros_cuadrados",
                "cantidad_pisos",
                "horario_preferido",
                "observaciones",
                "created_by",
                "created_at"
            ],

        });

        if (!edificio) {
            throw new Error("El edificio no existe");
        }

        // 👷 Personal asignado
        const personal = await PersonaEdificio.findAll({
            where: { edificio_id: edificioId, activo: true },
            attributes: ["dia_semana", "persona_id"],
            include: {
                model: Persona,
                attributes: ["id", "nombre", "apellido", "email", "rol"]
            }
        });

        // 📦 Productos
        const productos = await EdificioProducto.findAll({
            where: { edificio_id: edificioId },
            attributes: ["cantidad_actual", "cantidad_minima"],
            include: {
                model: Producto,
                attributes: ["id", "nombre", "unidad"]
            }
        });

        // 📝 Tareas
        const tareas = await EdificioTareaAsignacion.findAll({
            where: { edificio_id: edificioId },
            attributes: ["id"],
            include: {
                model: Tarea,
                attributes: ["id", "nombre", "prioritaria"]
            }
        });

        // ⏱ Horas trabajadas
        const horasTrabajadas = await RegistroTrabajo.findAll({
            where: { edificio_id: edificioId },
            attributes: ["fecha", "horas_totales"]
        });

        return {
            edificio,
            personal,
            productos,
            tareas,
            horasTrabajadas
        };

    } catch (error) {
        console.error("Error al obtener detalles del edificio:", error);
        return { error: error.message };
    }
};

module.exports = detallesEdificio;