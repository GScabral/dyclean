const { Router } = require("express")
require('dotenv').config();
const auth = require("./authRoutes")
const admin = require("./adminRoutes")
const edificio = require("./edificioRoutes")
const persona = require("./personaRoutes")
const horario = require("./horarioRoutes")
const tarea = require("./tareaRoutes")
const producto = require("./productoRoutes")
const personaEdificio = require("./personaEdifiRoutes")
const registroTarea = require("./resgistroTareaRoute")
const registroTrabajo = require("./registroTrabajoRoutes")
const reportRoutes = require("./reportRoutes")
const registroDiaTrabajo = require("./registroDiaTrabajoRoute")
const servicioRoutes = require("./servicioRoutes")
const liquidacionRoutes = require("./liquidacionRoutes")
// ✓ Supervisor usa las mismas rutas que admin con validación de roles
const router = Router();


router.use("/auth", auth)
router.use("/admin", admin)
router.use("/edificio", edificio)
router.use("/persona", persona)
router.use("/horario", horario)
router.use("/tarea", tarea)
router.use("/producto", producto)
router.use("/persona-edificio", personaEdificio)
router.use("/registro-tarea", registroTarea)
router.use("/registro-trabajo", registroTrabajo)
router.use("/report", reportRoutes)
router.use("/diatrabajo", registroDiaTrabajo)
router.use("/servicios", servicioRoutes)
router.use("/liquidacion", liquidacionRoutes)
// ✓ Nota: Supervisor accede a las mismas rutas (persona, edificio, report, registro-trabajo)
// con middleware de autenticación que valida permisos por rol

module.exports = router;