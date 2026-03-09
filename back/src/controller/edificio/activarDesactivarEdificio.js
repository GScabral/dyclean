const { Edificio } = require("../../config/db");

const activarDesactivarEdificio = async (edificioId, activo) => {
    try {
        if (!edificioId || typeof activo !== "boolean") {
            throw new Error("El id del edificio y el estado activo son obligatorios");
        }

        const edificio = await Edificio.findByPk(edificioId);

        if (!edificio) {
            throw new Error("El edificio no existe");
        }

        await edificio.update({ activo });

        return {
            mensaje: `Edificio ${activo ? "activado" : "desactivado"} correctamente`,
            edificio
        };

    } catch (error) {
        console.error("Error al activar/desactivar edificio:", error);
        return { error: error.message };
    }
};

module.exports = activarDesactivarEdificio;
