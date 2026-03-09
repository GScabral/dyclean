const { Router } = require("express")
require('dotenv').config();
const detallesEdificio = require("../controller/edificio/detallesEdificio")
const listEdificio = require("../controller/edificio/obtenerListadoEdificios")
const createEdificio = require("../controller/edificio/crearEdificio");
const { editarDatosEdificio } = require("../controller/edificio/editarDatosEdificio");
const activarDesactivarEdificio = require("../controller/edificio/activarDesactivarEdificio")
const validarSesion = require("../controller/auth/validarSesion");
const obtenerProductosPorEdificio = require("../controller/producto/obtenerProductosAsignados")
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");
const router = Router();


router.get("/listEdificio", validarSesion, async (req, res) => {
    try {
        const listEdificios = await listEdificio()
        res.status(200).json(listEdificios)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/detallesEdificio/:id", validarSesion, async (req, res) => {
    const { id } = req.params;

    try {
        const edificio = await detallesEdificio(id)

        if (!edificio) {
            return res.status(404).json({ error: "cliente no encontrado" })
        }

        res.status(200).json(edificio)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el edificio" })
    }
})

// validarSesion, soloAdminOSupervisor
router.post("/newEdificio", validarSesion, soloAdminOSupervisor, async (req, res) => {
    try {
        const nuevoEdificio = await createEdificio(req.body)
        if (nuevoEdificio && nuevoEdificio.error) {
            res.status(404).json({ error: nuevoEdificio.message })
        } else {
            res.status(200).json(nuevoEdificio)
        }
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" })
    }
})

router.put("/estadoEdificio/:id", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;

    try {
        const result = await activarDesactivarEdificio(id, activo);

        if (result.error) {
            return res.status(400).json(result);
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get("/asiganados", async (req, res) => {
    const result = await obtenerProductosPorEdificio();
    result?.error ? res.status(400).json(result) : res.json(result);
})


router.put("/editEdificio/:id", validarSesion, soloAdminOSupervisor, editarDatosEdificio);

module.exports = router;