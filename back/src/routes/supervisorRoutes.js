const { Router } = require("express");
const { 
    getAsistencias, 
    getReportes, 
    getEmpleadosConAsistencias,
    getEstadisticasSupervisor 
} = require("../controller/supervisor/supervisorController");
const validarSesion = require("../controller/auth/validarSesion");
const { soloSupervisor } = require("../utils/controlDeRoles");

const router = Router();

// Obtener asistencias (registro de trabajo)
router.get("/asistencias", validarSesion, soloSupervisor, async (req, res) => {
    try {
        const filtros = {
            personaId: req.query.personaId,
            fechaInicio: req.query.fechaInicio,
            fechaFin: req.query.fechaFin,
            edificioId: req.query.edificioId
        };
        
        const result = await getAsistencias(filtros);
        
        if (result.error) {
            return res.status(400).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Obtener reportes
router.get("/reportes", validarSesion, soloSupervisor, async (req, res) => {
    try {
        const filtros = {
            estado: req.query.estado,
            fechaInicio: req.query.fechaInicio,
            fechaFin: req.query.fechaFin
        };
        
        const result = await getReportes(filtros);
        
        if (result.error) {
            return res.status(400).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Obtener lista de empleados con asistencias
router.get("/empleados", validarSesion, soloSupervisor, async (req, res) => {
    try {
        const filtros = {
            rol: 'empleado',
            activo: true,
            edificioId: req.query.edificioId
        };
        
        const result = await getEmpleadosConAsistencias(filtros);
        
        if (result.error) {
            return res.status(400).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Obtener estadísticas del supervisor
router.get("/estadisticas", validarSesion, soloSupervisor, async (req, res) => {
    try {
        const result = await getEstadisticasSupervisor();
        
        if (result.error) {
            return res.status(400).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;
