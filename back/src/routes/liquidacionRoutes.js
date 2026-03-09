const express = require("express");
const router = express.Router();
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");

const {
    generarLiquidacion,
    getLiquidaciones,
    marcarComoPagado,
} = require("../controller/liquidacion/controllerLiquidacion");

router.post("/generar", validarSesion, soloAdminOSupervisor, generarLiquidacion);
router.get("/totalliquidacion", validarSesion, getLiquidaciones);
router.put("/pagar/:id", validarSesion, soloAdminOSupervisor, marcarComoPagado);

module.exports = router;
