require('dotenv').config();
const bcryptjs = require('bcryptjs');
const { conn } = require("./src/config/db");

async function crearAdmin() {
    try {

        console.log("\n===== VERIFICANDO ADMIN =====\n");

        const nombre = process.env.ADMIN_NOMBRE;
        const apellido = process.env.ADMIN_APELLIDO;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!nombre || !apellido || !email || !password) {
            console.log("⚠ Variables ADMIN no configuradas");
            return;
        }

        const { Persona } = conn.models;

        const adminExistente = await Persona.findOne({
            where: { email }
        });

        if (adminExistente) {
            console.log("✔ Admin ya existe");
            return;
        }

        const passwordHasheada = await bcryptjs.hash(password, 10);

        const admin = await Persona.create({
            nombre,
            apellido,
            email,
            rol: "admin",
            activo: true,
            password: passwordHasheada
        });

        console.log("\n✅ ADMIN CREADO AUTOMÁTICAMENTE");
        console.log("============================");
        console.log(`ID: ${admin.id}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Rol: ${admin.rol}`);
        console.log("");

    } catch (error) {

        console.error("❌ Error al crear admin:", error.message);

    }
}

module.exports = crearAdmin;