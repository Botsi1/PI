const { Videogame, Genero } = require("../../db")



const vgDB = async () => {



    var dbvgames = []
    dbvgames = await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            through: { attributes: [] }
        }

    })



    var dbvgames = dbvgames.map(p => {

        return {
            id: p.id,
            name: p.name,
            image: p.image,
            rating: p.rating,
            genres: p.generos.map(e => e.name),
            platform: p.platform,
            origin: 'DB'
        }
    })

    return dbvgames
}




module.exports = { vgDB }