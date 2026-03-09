const { Router } = require("express")
require('dotenv').config();
const { getResumenGeneral } = require("../controller/admin/verResumenGeneral")
const { getHorasTrabajadas } = require("../controller/admin/verResumenGeneral")
const { getAusencias } = require("../controller/admin/verResumenGeneral")
const { getIncidencias } = require("../controller/admin/verResumenGeneral")
const { exportarHorasExcel } = require("../controller/admin/verResumenGeneral")
const { getEstadisticas } = require("../controller/admin/verResumenGeneral")
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdmin } = require("../utils/controlDeRoles");

const router = Router();

router.get('/resumen', validarSesion, soloAdmin, getResumenGeneral);
router.get('/horas', validarSesion, soloAdmin, getHorasTrabajadas);
router.get('/ausencias', validarSesion, soloAdmin, getAusencias);
router.get('/incidencias', validarSesion, soloAdmin, getIncidencias);
router.get('/horasExel', validarSesion, soloAdmin, exportarHorasExcel);
router.get('/estadisticas', validarSesion, soloAdmin, getEstadisticas);




module.exports = router;