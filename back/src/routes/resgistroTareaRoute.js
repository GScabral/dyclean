const { Router } = require("express")
const validarSesion = require("../controller/auth/validarSesion");

const marcarTareaRealizada = require("../controller/registroTarea/marcarTareaRealizada")
const registrarInconveniente = require("../controller/registroTarea/registrarInconveniente")
const verTareasPendientes = require("../controller/registroTarea/verTaresPendientes")

const router = Router();


router.put("/:id/realizada", validarSesion, async (req, res) => {
    const { id } = req.params;
    const { realizada } = req.body;

    const result = await marcarTareaRealizada(id, realizada);
    res.status(200).json(result);
});

router.put("/:id/inconveniente", validarSesion, async (req, res) => {
    const { id } = req.params;
    const { inconveniente } = req.body;

    const result = await registrarInconveniente(id, inconveniente);
    res.status(200).json(result);
});

router.get("/pendientes", validarSesion, async (req, res) => {
    // el controlador ahora recibirá el id del usuario desde el token
    const result = await verTareasPendientes(req.user.id);
    res.status(200).json(result);
});


module.exports = router;

