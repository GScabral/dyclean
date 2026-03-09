const { Reporte, Persona, Edificio } = require("../../config/db");

const getAllReport = async () => {
    try {
        const listaReport = await Reporte.findAll({
            include: [
                {
                    model: Persona,
                    attributes: ["id", "nombre", "apellido", "email"]
                },
                {
                    model: Edificio,
                    attributes: ["id", "nombre"]
                }
            ],
            order: [["created_at", "DESC"]]
        });

        return listaReport;
    } catch (error) {
        console.error("Error al traer la lista de reportes", error);
        throw error;
    }
};

module.exports = getAllReport;
