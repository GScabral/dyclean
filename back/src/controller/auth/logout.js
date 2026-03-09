const logout = async (req, res) => {
    // En backend simple solo informamos
    res.json({ message: "Sesión cerrada correctamente" });
};

module.exports = logout;
