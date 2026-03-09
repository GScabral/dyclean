const { Router } = require("express");
const obtenerDiasTrabajados = require("../controller/registrotrabajo/getDiaTrabajo")
const marcarDiaTrabajado = require("../controller/registrotrabajo/registroDiaTrabajo")
const getAllRegistroDiaTrabajo = require("../controller/registrotrabajo/getAlldiaTrabajo")
const validarSesion = require("../controller/auth/validarSesion");

const router = Router();

router.get("/dias-trabajados/:personaId/:anio/:mes", validarSesion, async (req, res) => {
    const { personaId, anio, mes } = req.params;

    const resultado = await obtenerDiasTrabajados(
        parseInt(personaId),
        parseInt(mes),
        parseInt(anio)
    );

    res.json(resultado);
});

router.post("/registrodiatrabajo", validarSesion, async (req, res) => {
    try {
        // Idealmente sacar el id del token
        const persona_id = req.user?.id || req.body.persona_id;
        const { fecha } = req.body;

        if (!persona_id || !fecha) {
            return res.status(400).json({
                success: false,
                error: "persona_id y fecha son obligatorios"
            });
        }

        const resultado = await marcarDiaTrabajado(persona_id, fecha);

        // 🔹 Ya estaba marcado (no es error)
        if (resultado.alreadyMarked) {
            return res.status(200).json(resultado);
        }

        // 🔹 Error real
        if (resultado.success === false) {
            return res.status(400).json(resultado);
        }

        // 🔹 Creado correctamente
        return res.status(201).json(resultado);

    } catch (error) {
        console.error("Error en endpoint POST /registrodiatrabajo:", error);
        return res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
});

router.get("/allDias", validarSesion, async (req, res) => {
    try {
        const { persona_id, mes, anio } = req.query;

        const resultado = await getAllRegistroDiaTrabajo(
            persona_id ? parseInt(persona_id) : null,
            mes ? parseInt(mes) : null,
            anio ? parseInt(anio) : null
        );

        if (resultado.error) {
            return res.status(400).json(resultado);
        }

        return res.status(200).json(resultado);

    } catch (error) {
        console.error("Error en GET /diatrabajo:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});



module.exports = router;
