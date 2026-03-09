const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('../routes/indexRoute');


require("./db.js")


const server = express();
server.name = "back"


server.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
server.use(bodyParser.json({limit:'50mb'}));
server.use(cookieParser());
server.use(cors())


server.use('/',router);

// Mostrar rutas registradas (debug)
setTimeout(() => {
    try {
        const list = router.stack
            .filter(r => r.route)
            .map(r => Object.keys(r.route.methods).map(m => m.toUpperCase() + ' ' + r.route.path).join(', '));
        console.log('Rutas registradas en router:', list);
    } catch (e) {
        console.error('No se pudieron listar rutas del router:', e.message);
    }
}, 100);

server.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(err);
    res.status(status).send(message)
});


module.exports = server;


