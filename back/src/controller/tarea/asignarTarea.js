const { RegistroTarea, Persona, Edificio, Tarea } = require("../../config/db");

const asignarTarea = async (req, res) => {
  try {
    const {
      persona_id,
      edificio_id,
      tarea_id,
      fecha,
      estado
    } = req.body;

    /* =====================
       VALIDACIONES BÁSICAS
    ====================== */
    if (!persona_id || !edificio_id || !tarea_id) {
      return res.status(400).json({
        success: false,
        error: "Faltan datos obligatorios",
        required: ["persona_id", "edificio_id", "tarea_id"]
      });
    }

    /* =====================
       VALIDAR PERSONA
    ====================== */
    const persona = await Persona.findByPk(persona_id);
    if (!persona) {
      return res.status(404).json({
        success: false,
        error: "Persona no encontrada",
        persona_id
      });
    }

    /* =====================
       VALIDAR EDIFICIO
    ====================== */
    const edificio = await Edificio.findByPk(edificio_id);
    if (!edificio) {
      return res.status(404).json({
        success: false,
        error: "Edificio no encontrado",
        edificio_id
      });
    }

    /* =====================
       VALIDAR TAREA
    ====================== */
    const tarea = await Tarea.findByPk(tarea_id);
    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrada",
        tarea_id
      });
    }

    /* =====================
       VALIDAR FECHA
    ====================== */
    const fechaAsignacion = fecha ? new Date(fecha) : new Date();
    if (isNaN(fechaAsignacion.getTime())) {
      return res.status(400).json({
        success: false,
        error: "La fecha enviada no es válida"
      });
    }

    /* =====================
       VALIDAR ESTADO
    ====================== */
    const estadosPermitidos = ["pendiente", "en_progreso", "completada"];
    const estadoFinal = estado || "pendiente";

    if (!estadosPermitidos.includes(estadoFinal)) {
      return res.status(400).json({
        success: false,
        error: "Estado de tarea inválido",
        estadosPermitidos
      });
    }

    /* =====================
       OBTENER/CREAR JORNADA (registro_trabajo)
    ====================== */
    // usamos la misma fecha de asignación para buscar la jornada diaria
    const fechaStr = fechaAsignacion.toISOString().split('T')[0];
    const { RegistroTrabajo } = require("../../config/db");

    // La tabla tiene una restricción única sobre (persona_id, fecha),
    // por lo que no podemos incluir edificio_id en la búsqueda:
    let registroTrabajo = await RegistroTrabajo.findOne({
      where: { persona_id, fecha: fechaStr }
    });

    if (!registroTrabajo) {
      // si no hay registro, creamos uno mínimo para poder vincular tareas
      registroTrabajo = await RegistroTrabajo.create({
        persona_id,
        edificio_id,
        fecha: fechaStr,
        horas_totales: 0
      });
    } else if (registroTrabajo.edificio_id !== edificio_id) {
      // si ya existía pero con edificio distinto, actualizamos para mantener
      // coherencia con la tarea que estamos asignando
      registroTrabajo.edificio_id = edificio_id;
      await registroTrabajo.save();
    }

    /* =====================
       CREAR REGISTRO DE TAREA
    ====================== */
    const nuevaTarea = await RegistroTarea.create({
      persona_id,
      edificio_id,
      tarea_id,
      fecha: fechaAsignacion,
      estado: estadoFinal,
      registro_trabajo_id: registroTrabajo.id
    });

    /* =====================
       RESPUESTA EXITOSA
    ====================== */
    return res.status(201).json({
      success: true,
      message: "Tarea asignada correctamente",
      data: {
        id: nuevaTarea.id,
        fecha: nuevaTarea.fecha,
        estado: nuevaTarea.estado,
        persona: {
          id: persona.id,
          nombre: persona.nombre,
          apellido: persona.apellido
        },
        edificio: {
          id: edificio.id,
          nombre: edificio.nombre
        },
        tarea: {
          id: tarea.id,
          nombre: tarea.nombre,
          descripcion: tarea.descripcion
        }
      }
    });

  } catch (error) {
    console.error("❌ Error al asignar tarea:", error);

    return res.status(500).json({
      success: false,
      error: "Error interno del servidor al asignar la tarea",
      details: error.message
    });
  }
};

module.exports = asignarTarea;
