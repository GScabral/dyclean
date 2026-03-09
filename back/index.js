const server = require("./src/config/app");
const { conn } = require("./src/config/db");
const crearAdmin = require("./crear-admin"); // IMPORTANTE

const PORT = process.env.PORT || 3004;

conn.sync({ force: false }).then(async () => {

    await crearAdmin(); // EJECUTA EL SEED

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

});