const { Router } = require("express");
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");
const crearReporte = require("../controller/reportes/reportes")
const getAllReport = require("../controller/reportes/getAllReportes")
const alertaProducto = require("../controller/producto/reportStock")
const actualizarEstadoReporte =require("../controller/reportes/estadoReporte")

const router = Router()


router.post("/newreporte", validarSesion, crearReporte);

router.get("/allReport", validarSesion, async (req, res) => {

    try {
        const listaReportes = await getAllReport();
        res.status(200).json(listaReportes)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/productoStock", validarSesion, alertaProducto);

router.patch("/reporte/:id/estado", validarSesion, soloAdminOSupervisor, actualizarEstadoReporte);


module.exports = router;