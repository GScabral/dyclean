const soloAdmin = (req, res, next) => {
    if (req.user.rol !== "admin") {
        return res.status(403).json({ error: "Acceso solo para administradores" });
    }
    next();
};

const soloEmpleado = (req, res, next) => {
    if (req.user.rol !== "empleado") {
        return res.status(403).json({ error: "Acceso solo para empleados" });
    }
    next();
};

const soloSupervisor = (req, res, next) => {
    if (req.user.rol !== "supervisor") {
        return res.status(403).json({ error: "Acceso solo para supervisores" });
    }
    next();
};

const soloAdminOSupervisor = (req, res, next) => {
    if (req.user.rol !== "admin" && req.user.rol !== "supervisor") {
        return res.status(403).json({ error: "Acceso solo para administradores y supervisores" });
    }
    next();
};

module.exports = {
    soloAdmin,
    soloEmpleado,
    soloSupervisor,
    soloAdminOSupervisor
};
