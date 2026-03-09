const { Router } = require("express")
require('dotenv').config();
const crearPersonaConEdificio = require("../controller/persona/crearPersona")
const listPersona = require("../controller/persona/listarPersonal");
const asignarDiasEdificio = require("../controller/persona/asignarDiasEdificios");
const validarSesion = require("../controller/auth/validarSesion");
const detallePersona = require("../controller/persona/detallePersona")
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");
const router = Router();

router.post("/newPersonaConEdificio", validarSesion, soloAdminOSupervisor, async (req, res) => {
    try {
        const result = await crearPersonaConEdificio(req.body);

        if (result?.error) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

router.get("/listPersonal", validarSesion, async (req, res) => {
    try {
        const listaPersonal = await listPersona();
        res.status(200).json(listaPersonal)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/asignar", validarSesion, soloAdminOSupervisor, async (req, res) => {
    try {
        const result = await asignarDiasEdificio(req.body);

        if (result?.error) {
            return res.status(400).json({
                error: result.error
            });
        }

        res.status(201).json({
            message: "Asignación creada correctamente",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/detallesPersona/:id", validarSesion, async (req, res) => {
    const { id } = req.params;

    try {
        // Validar ID
        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: "El id de la persona es inválido"
            });
        }

        const persona = await detallePersona(id);

        return res.status(200).json({
            success: true,
            data: persona
        });

    } catch (error) {
        console.error("Error en detallesPersona:", error.message);

        // ❌ Persona no encontrada
        if (error.message === "La persona no existe") {
            return res.status(404).json({
                error: error.message
            });
        }

        // ❌ Error de validación
        if (error.message === "El id de la persona es obligatorio") {
            return res.status(400).json({
                error: error.message
            });
        }

        // ❌ Error inesperado
        return res.status(500).json({
            error: "Error interno al obtener la persona",
            details: error.message
        });
    }
});




module.exports = router;