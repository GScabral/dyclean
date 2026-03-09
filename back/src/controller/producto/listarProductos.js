const { Producto } = require("../../config/db")


const listProductos=async()=>{
    try{
        const listProducto = await Producto.findAll()
        return listProducto;
    }catch(error){
        console.error("Error al traer la lista de productos",error);
        return {Error:error.message}
    }
}


module.exports = listProductos