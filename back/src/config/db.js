require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require("path")

let sequelize;

if (process.env.DATABASE_URL) {

    // PRODUCCIÓN (Render)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

} else {

    // LOCAL
    sequelize = new Sequelize(
        process.env.DB_NAME || 'dyclean',
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: false
        }
    );
}

const basename = path.basename(__filename);
const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '../models'))
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, '../models', file));
        modelDefiners.push(model);
    });

modelDefiners.forEach(model => model(sequelize, DataTypes));

const models = sequelize.models;

if (models) {

    const {
        StockMovimiento, RegistroServicio, RegistroDiaTrabajo,
        Persona, Edificio, PersonaEdificio, RegistroTrabajo, Foto,
        RegistroTarea, Tarea, Producto, EdificioProducto,
        EdificioTareaAsignacion, Reporte, Liquidacion
    } = models;

    Persona.hasMany(PersonaEdificio, { foreignKey: 'persona_id' });
    PersonaEdificio.belongsTo(Persona, { foreignKey: 'persona_id' });

    Edificio.hasMany(PersonaEdificio, { foreignKey: 'edificio_id' });
    PersonaEdificio.belongsTo(Edificio, { foreignKey: 'edificio_id' });

    Persona.belongsToMany(Edificio, { through: 'PersonaEdificio', foreignKey: 'persona_id' });
    Edificio.belongsToMany(Persona, { through: 'PersonaEdificio', foreignKey: 'edificio_id' });

    Edificio.hasMany(RegistroTrabajo, { foreignKey: 'edificio_id' });
    RegistroTrabajo.belongsTo(Edificio, { foreignKey: 'edificio_id' });

    Persona.hasMany(RegistroTrabajo, { foreignKey: 'persona_id' });
    RegistroTrabajo.belongsTo(Persona, { foreignKey: 'persona_id' });

    RegistroTrabajo.hasMany(RegistroTarea, { foreignKey: 'registro_trabajo_id' });
    RegistroTarea.belongsTo(RegistroTrabajo, { foreignKey: 'registro_trabajo_id' });

    Tarea.hasMany(RegistroTarea, { foreignKey: 'tarea_id' });
    RegistroTarea.belongsTo(Tarea, { foreignKey: 'tarea_id' });

    Edificio.hasMany(EdificioTareaAsignacion, { foreignKey: 'edificio_id' });
    EdificioTareaAsignacion.belongsTo(Edificio, { foreignKey: 'edificio_id' });

    Tarea.hasMany(EdificioTareaAsignacion, { foreignKey: 'tarea_id' });
    EdificioTareaAsignacion.belongsTo(Tarea, { foreignKey: 'tarea_id' });

    Edificio.hasMany(EdificioProducto, { foreignKey: 'edificio_id' });
    EdificioProducto.belongsTo(Edificio, { foreignKey: 'edificio_id' });

    Producto.hasMany(EdificioProducto, { foreignKey: 'producto_id' });
    EdificioProducto.belongsTo(Producto, { foreignKey: 'producto_id' });

    Reporte.belongsTo(Persona, { foreignKey: 'PersonaId' });
    Persona.hasMany(Reporte, { foreignKey: 'PersonaId' });

    Reporte.belongsTo(Edificio, { foreignKey: 'EdificioId' });
    Edificio.hasMany(Reporte, { foreignKey: 'EdificioId' });

    Persona.hasMany(RegistroServicio, {
        foreignKey: "persona_id",
        as: "servicios",
    });

    RegistroServicio.belongsTo(Persona, {
        foreignKey: "persona_id",
        as: "persona",
    });

    Liquidacion.belongsTo(Persona, { foreignKey: "persona_id" });
    Persona.hasMany(Liquidacion, { foreignKey: "persona_id" });

    Producto.hasMany(StockMovimiento, { foreignKey: "producto_id" });
    StockMovimiento.belongsTo(Producto, { foreignKey: "producto_id" });

    Edificio.hasMany(StockMovimiento, { foreignKey: "edificio_id" });
    StockMovimiento.belongsTo(Edificio, { foreignKey: "edificio_id" });
}

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};