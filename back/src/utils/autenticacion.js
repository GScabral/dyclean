const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ 
                error: "Token no proporcionado" 
            });
        }

        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );

        req.usuario = decoded;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ 
                error: "Token expirado" 
            });
        }
        
        return res.status(401).json({ 
            error: "Token inválido" 
        });
    }
};

const soloAdmin = (req, res, next) => {
    try {
        if (req.usuario.rol !== "admin") {
            return res.status(403).json({ 
                error: "Solo administradores pueden acceder a este recurso" 
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({ 
            error: "No autorizado" 
        });
    }
};

const soloEmpleado = (req, res, next) => {
    try {
        if (req.usuario.rol !== "empleado") {
            return res.status(403).json({ 
                error: "Solo empleados pueden acceder a este recurso" 
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({ 
            error: "No autorizado" 
        });
    }
};

module.exports = {
    autenticar,
    soloAdmin,
    soloEmpleado
};
