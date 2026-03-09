const { Persona, Edificio } = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email y contraseña requeridos"
            });
        }

        const persona = await Persona.findOne({
            where: { email, activo: true },
            include: [
                {
                    model: Edificio,
                    attributes: ["id", "nombre"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!persona) {
            return res.status(401).json({
                error: "Credenciales inválidas"
            });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            persona.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                error: "Credenciales inválidas"
            });
        }

        const accessToken = jwt.sign(
            {
                id: persona.id,
                rol: persona.rol,
                edificios: persona.Edificios.map(e => e.id)
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        const refreshToken = jwt.sign(
            { id: persona.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            success: true,
            accessToken,
            refreshToken,
            usuario: {
                id: persona.id,
                nombre: persona.nombre,
                email: persona.email,
                rol: persona.rol,
                edificios: persona.Edificios // 👈 ARRAY
            }
        });

    } catch (error) {
        console.error("Error login:", error);
        res.status(500).json({
            error: "Error al iniciar sesión"
        });
    }
};

module.exports = login;
