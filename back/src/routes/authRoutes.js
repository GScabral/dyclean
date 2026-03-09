const { Router } = require("express");
const login = require("../controller/auth/login");
const crearUsuario = require("../controller/auth/crearUsuario");
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");

const router = Router();

// Login (público)
router.post("/login", login);

// Crear usuario (admin o supervisor)
router.post("/crear-usuario", validarSesion, soloAdminOSupervisor, crearUsuario);

module.exports = router;
