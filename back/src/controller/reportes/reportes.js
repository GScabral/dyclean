const { Reporte, Persona, Edificio } = require("../../config/db");

const crearReporte = async (req, res) => {
    try {
        // aceptar varios nombres por conveniencia
        const {
            descripcion,
            tipo,
            edificio_id,
            edificioId,
            persona_id,
            PersonaId
        } = req.body;

        // persona_id puede venir como persona_id, id, PersonaId
        const personaIdFinal =
            persona_id || req.body.id || PersonaId || null;

        // edificio_id viene también como EdificioId
        const edificioIdFinal = edificio_id || edificioId || null;

        if (!descripcion || !tipo) {
            return res.status(400).json({
                error: "La descripción y el tipo son obligatorios"
            });
        }

        if (!personaIdFinal) {
            return res.status(400).json({
                error: "Persona no identificada"
            });
        }

        const nuevoReporte = await Reporte.create({
            descripcion,
            tipo,
            PersonaId: personaIdFinal,
            EdificioId: edificioIdFinal
        });

        res.status(201).json({
            success: true,
            reporte: nuevoReporte
        });

    } catch (error) {
        console.error("Error al crear reporte:", error);
        res.status(500).json({
            error: "Error interno al crear el reporte"
        });
    }
};


module.exports = crearReporte;
