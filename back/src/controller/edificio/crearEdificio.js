const { Edificio } = require("../../config/db");

const createEdificio = async (edificioData) => {
    try {
        const {
            nombre,
            direccion,
            frecuencia_limpieza,
            litros_estimados,
            duracion_estimada_minutos,
            activo = true,

            // nuevos campos opcionales
            telefono_contacto,
            email_contacto,
            encargado,
            latitud,
            longitud,
            tipo_limpieza,
            metros_cuadrados,
            cantidad_pisos,
            horario_preferido,
            observaciones,
            created_by
        } = edificioData;

        // ✅ Validación correcta (sin romper activo=false)
        if (
            !nombre ||
            !direccion ||
            !frecuencia_limpieza ||
            litros_estimados == null ||
            duracion_estimada_minutos == null
        ) {
            throw new Error("Faltan campos obligatorios para crear el edificio");
        }

        const newEdificio = await Edificio.create({
            nombre,
            direccion,
            frecuencia_limpieza,
            litros_estimados,
            duracion_estimada_minutos,
            activo,

            telefono_contacto,
            email_contacto,
            encargado,
            latitud,
            longitud,
            tipo_limpieza,
            metros_cuadrados,
            cantidad_pisos,
            horario_preferido,
            observaciones,
            created_by
        });

        console.log("Nuevo edificio creado:", newEdificio.id);

        return newEdificio;

    } catch (error) {
        console.error("Error en la creación del edificio:", error.message);
        return { error: error.message };
    }
};

module.exports = createEdificio;