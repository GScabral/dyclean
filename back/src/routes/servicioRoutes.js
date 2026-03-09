const express = require("express");
const router = express.Router();
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");

const {
    crearRegistroServicio,
    getServiciosPorPersona,
    getTotalMensual,
    getAllServicios,
} = require("../controller/servicio/registrosServicios");


// Crear servicio
router.post("/newService", validarSesion, soloAdminOSupervisor, crearRegistroServicio);

// Servicios por persona
router.get("/persona/:persona_id", validarSesion, getServiciosPorPersona);

// Total mensual
router.get("/total-mensual", validarSesion, getTotalMensual);

// Obtener todos con filtros
router.get("/allServicios", validarSesion, getAllServicios);

module.exports = router;
