const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token requerido" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(403).json({ error: "Refresh token inválido" });
    }
};

module.exports = refreshToken;
