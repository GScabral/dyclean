const { Router } = require("express");

const actualizarStock = require("../controller/producto/actualizarStock");
const asignarProductoEdificio = require("../controller/producto/asignarProductoEdificio");
const productosFaltantes = require("../controller/producto/productosFaltantes");
const listProductos = require("../controller/producto/listarProductos")
const addProducto = require("../controller/producto/crearProducto")
const desasignarProductoEdificio = require("../controller/producto/desasiganarProducto")
const agregarStock = require("../controller/producto/agregarStock")
const obtenerHistorialStock = require("../controller/producto/obtenerHistorialStock")
const validarSesion = require("../controller/auth/validarSesion");
const { soloAdminOSupervisor } = require("../utils/controlDeRoles");



const router = Router();

// actualizar stock general
router.put("/stock/:id", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await actualizarStock(req.params.id, req.body);
    result?.error ? res.status(400).json(result) : res.status(200).json(result);
});

router.post("/newProducto", validarSesion, soloAdminOSupervisor, async (req, res) => {
    try {
        const nuevoProducto = await addProducto(req.body)

        if (!nuevoProducto) {
            return res.status(404).json({ error: "no se pudo crear el producto" })
        } else {
            res.status(200).json(nuevoProducto)
        }
    } catch (error) {
        res.status(500).json({ error: "error en el servidor " })
    }
})

router.get("/productList", validarSesion, async (req, res) => {
    try {
        const listProducto = await listProductos();
        res.status(200).json(listProducto)
    } catch (error) {
        res.status(500).json(error)
    }
})

// asignar producto a edificio
router.post("/asignar-edificio", validarSesion, soloAdminOSupervisor, async (req, res) => {
    const result = await asignarProductoEdificio(req.body);
    result?.error ? res.status(400).json(result) : res.status(201).json(result);
});

// listar productos faltantes
router.get("/faltantes", validarSesion, async (req, res) => {
    const result = await productosFaltantes();
    result?.error ? res.status(400).json(result) : res.json(result);
});


router.delete("/desasignar-producto/:id", async (req, res) => {
    const { id } = req.params;

    const result = await desasignarProductoEdificio(id);

    if (result.error) {
        return res.status(400).json(result);
    }

    res.json(result);
});

router.post("/agregar-stock", agregarStock);


router.get("/historial", async (req, res) => {

    const resp = await obtenerHistorialStock();

    res.json(resp);

});

module.exports = router;
