// Eliminar asignación (DELETE)

const { Router } = require("express");

const asignarEmpleadoEdificio = require("../controller/personaedificio/asignarEmpleadoEdificio");
const definirDiasTrabajo = require("../controller/personaedificio/definirDiasTrabajo");
const listarAsignacion = require("../controller/personaedificio/listarAsignacion");
const quitarAsignacion = require("../controller/personaedificio/quitarAsignacion");
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");
const router = Router();

// Asignar persona a edificio
router.post("/asignar", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await asignarEmpleadoEdificio(req.body);
    res.json(result);
});

// Definir días de trabajo
router.put("/dias", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await definirDiasTrabajo(req.body);
    res.json(result);
});

// Listar asignaciones
router.get("/listar", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await listarAsignacion();
    res.json(result);
});

// Quitar (desactivar) asignación
router.put("/quitar/:id", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const { id } = req.params;
    const result = await quitarAsignacion(id);
    res.json(result);
});
router.delete("/eliminar/:id", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const { id } = req.params;
    const result = await quitarAsignacion(id);
    res.json(result);
});

module.exports = router;
