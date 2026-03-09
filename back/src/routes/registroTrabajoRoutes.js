const { Router } = require("express");

const iniciarJornada = require("../controller/registrotrabajo/iniciarJordanada");
// const finalizarJornada = require("../controller/registrotrabajo/finalizarJornada");
const obtenerRegistrodiario = require("../controller/registrotrabajo/obtenerRegistrodiario");
const obtenerRegistrosPorPersona = require("../controller/registrotrabajo/obtenerRegistrosPorpersona");
const calcularHorasTrabajadas = require("../controller/registrotrabajo/calcularHorasTra");
const validarSesion = require("../controller/auth/validarSesion");

const router = Router();

// Iniciar jornada
router.post("/iniciar", validarSesion, async (req, res) => {
    try {
        const result = await iniciarJornada(req.body);
        result?.error ? res.status(400).json(result) : res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Finalizar jornada
// router.put("/finalizar/:id", validarSesion, async (req, res) => {
//     try {
//         const result = await finalizarJornada(req.params.id);
//         result?.error ? res.status(400).json(result) : res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ error: "Error del servidor" });
//     }
// });

// Obtener registro diario
router.get("/diario/:personaId", validarSesion, async (req, res) => {
    try {
        const { personaId } = req.params;
        const { fecha } = req.query;
        const result = await obtenerRegistrodiario(personaId, fecha);
        result?.error ? res.status(400).json(result) : res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Obtener registros por persona
router.get("/persona/:personaId", validarSesion, async (req, res) => {
    try {
        const { personaId } = req.params;
        const result = await obtenerRegistrosPorPersona(personaId);
        result?.error ? res.status(400).json(result) : res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Calcular horas trabajadas
router.get("/horas", validarSesion, async (req, res) => {
    try {
        const { persona_id, fecha_inicio, fecha_fin } = req.query;
        const result = await calcularHorasTrabajadas(persona_id, fecha_inicio, fecha_fin);
        result?.error ? res.status(400).json(result) : res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

module.exports = router;
