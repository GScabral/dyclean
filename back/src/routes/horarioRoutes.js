const { Router } = require("express");

const asignarHorarios = require("../controller/horarios/asignarHorario");
const modificarHorario = require("../controller/horarios/modificarHorario");
const obtenerHorarioPorPersona = require("../controller/horarios/obtenerHorarioPorPersona");
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");
const router = Router();

router.post("/asignar",validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await asignarHorarios(req.body);
    result?.error ? res.status(400).json(result) : res.status(201).json(result);
});

router.put("/modificar/:id",validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await modificarHorario(req.params.id, req.body);
    result?.error ? res.status(400).json(result) : res.status(200).json(result);
});

router.get("/persona/:persona_id", validarSesion, async (req, res) => {
    const result = await obtenerHorarioPorPersona(req.params.persona_id);
    result?.error ? res.status(400).json(result) : res.status(200).json(result);
});

module.exports = router;
