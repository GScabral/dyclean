const { Edificio } = require("../../config/db")


const listEdificio = async () => {
    try {
        console.log('listEdificio called - modelo Edificio existe?', !!Edificio);
        const listaDeEdificio = await Edificio.findAll()
        return listaDeEdificio
    }catch(error){
        console.error("error en listEdificio:", error.message)
    }
}


module.exports = listEdificio