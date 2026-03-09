const { Router } = require("express");

const crearTarea = require("../controller/tarea/crearTarea");
const editarTarea = require("../controller/tarea/editarTarea");
const listarTareasActivas = require("../controller/tarea/listarTareasActivas");
const marcarTareaPrioritaria = require("../controller/tarea/marcarTareaPriori");
const validarSesion = require("../controller/auth/validarSesion");
const asignarTarea= require("../controller/tarea/asignarTarea")
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");
const router = Router();

router.post("/new",validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await crearTarea(req.body);
    result?.error ? res.status(400).json(result) : res.status(201).json(result);
});

router.put("/editar/:id", validarSesion, soloAdminOSupervisor,async (req, res) => {
    const result = await editarTarea(req.params.id, req.body);
    result?.error ? res.status(400).json(result) : res.status(200).json(result);
});

router.get("/activas",validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await listarTareasActivas();
    result?.error ? res.status(400).json(result) : res.status(200).json(result);
});

router.patch("/prioritaria/:id",validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await marcarTareaPrioritaria(
        req.params.id,
        req.body.prioritaria
    );
    result?.error ? res.status(400).json(result) : res.status(200).json(result);
});

router.post("/asignar", asignarTarea);


module.exports = router;
