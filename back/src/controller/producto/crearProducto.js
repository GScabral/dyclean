const { Producto } = require("../../config/db");

const addProducto = async (productoData) => {
    try {
        const { nombre, unidad, stock_actual, stock_minimo } = productoData;

        if (
            !nombre ||
            !unidad ||
            stock_actual === undefined ||
            stock_minimo === undefined
        ) {
            throw new Error("Faltan campos obligatorios para crear el producto");
        }

        const newProducto = await Producto.create({
            nombre,
            unidad,
            stock_actual,
            stock_minimo
        });

        console.log("Producto creado correctamente", newProducto.id);
        return newProducto;

    } catch (error) {
        console.error("Error en la creación del producto", error);
        return { error: error.message };
    }
};

module.exports = addProducto;
