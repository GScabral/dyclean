const { Persona, RegistroTrabajo, Reporte, PersonaEdificio } = require("../../config/db");

// Obtener asistencias (registro de trabajo)
const getAsistencias = async (filtros = {}) => {
    try {
        const { personaId, fechaInicio, fechaFin, edificioId } = filtros;
        
        let where = {};
        
        if (personaId) {
            where.persona_id = personaId;
        }
        
        if (fechaInicio && fechaFin) {
            where.fecha = {
                [require('sequelize').Op.between]: [fechaInicio, fechaFin]
            };
        }
        
        const registros = await RegistroTrabajo.findAll({
            where,
            include: [
                {
                    model: Persona,
                    attributes: ['id', 'nombre', 'apellido', 'email', 'rol'],
                    required: true
                }
            ],
            order: [['fecha', 'DESC']]
        });
        
        return {
            success: true,
            data: registros,
            total: registros.length
        };
    } catch (error) {
        console.error("Error en getAsistencias:", error);
        return {
            error: error.message
        };
    }
};

// Obtener reportes
const getReportes = async (filtros = {}) => {
    try {
        const { estado, fechaInicio, fechaFin } = filtros;
        
        let where = {};
        
        if (estado) {
            where.estado = estado;
        }
        
        if (fechaInicio && fechaFin) {
            where.created_at = {
                [require('sequelize').Op.between]: [fechaInicio, fechaFin]
            };
        }
        
        const reportes = await Reporte.findAll({
            where,
            include: [
                {
                    model: Persona,
                    attributes: ['id', 'nombre', 'apellido', 'email'],
                    required: false
                }
            ],
            order: [['created_at', 'DESC']]
        });
        
        return {
            success: true,
            data: reportes,
            total: reportes.length
        };
    } catch (error) {
        console.error("Error en getReportes:", error);
        return {
            error: error.message
        };
    }
};

// Obtener lista de empleados con sus asistencias
const getEmpleadosConAsistencias = async (filtros = {}) => {
    try {
        const { rol = 'empleado', activo = true, edificioId } = filtros;
        
        let where = {
            rol: rol,
            activo: activo
        };
        
        let empleados = await Persona.findAll({
            where,
            attributes: ['id', 'nombre', 'apellido', 'email', 'cedula', 'telefono', 'rol', 'activo'],
            include: [
                {
                    model: PersonaEdificio,
                    attributes: ['edificio_id', 'dia_semana'],
                    required: false,
                    ...(edificioId && { where: { edificio_id: edificioId } })
                },
                {
                    model: RegistroTrabajo,
                    attributes: ['id', 'fecha', 'hora_entrada', 'hora_salida'],
                    required: false,
                    limit: 10,
                    order: [['fecha', 'DESC']]
                }
            ],
            order: [['nombre', 'ASC']]
        });
        
        return {
            success: true,
            data: empleados,
            total: empleados.length
        };
    } catch (error) {
        console.error("Error en getEmpleadosConAsistencias:", error);
        return {
            error: error.message
        };
    }
};

// Obtener estadísticas del supervisor
const getEstadisticasSupervisor = async () => {
    try {
        const totalEmpleados = await Persona.count({
            where: { rol: 'empleado', activo: true }
        });
        
        const totalReportes = await Reporte.count();
        
        const reportesPendientes = await Reporte.count({
            where: { estado: 'pendiente' }
        });
        
        const registrosHoy = await RegistroTrabajo.count({
            where: {
                fecha: require('sequelize').literal('CURDATE()')
            }
        });
        
        return {
            success: true,
            data: {
                totalEmpleados,
                totalReportes,
                reportesPendientes,
                registrosHoy
            }
        };
    } catch (error) {
        console.error("Error en getEstadisticasSupervisor:", error);
        return {
            error: error.message
        };
    }
};

module.exports = {
    getAsistencias,
    getReportes,
    getEmpleadosConAsistencias,
    getEstadisticasSupervisor
};
