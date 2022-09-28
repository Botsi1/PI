const axios = require("axios");
const { Videogame, Op, Genero, key } = require("../../db");


const getByName = async (name) => {


    var dbvgames = []
    dbvgames = await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            through: { attributes: [] }
        }

    })

    try {
        if (name) {
            dbvgames = dbvgames.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))

            if (!dbvgames.length) console.log("no hay nada en la base de datos")
            let sname = name.split(' ').join('-').toLowerCase()
            console.log(sname)
            var apiresult = await axios.get(`https://api.rawg.io/api/games?search=${sname}&key=${key}&page_size=100`)
            apiresult = apiresult.data.results


            const gameDB = dbvgames.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    year: p.released,
                    rating: p.rating,
                    platform: p.platform,
                    origin: "DB",
                    image: p.background_image,
                    genres: p.generos.map((e) => e.name)
                }
            })




            const game = apiresult.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    year: p.released,
                    rating: p.rating,
                    platform: p.platforms.map(e => { return e.platform.name }),
                    origin: "API",
                    image: p.background_image,
                    genres: p.genres.map(e => { return e.name })

                }
            })

            const gamefiltrado = game.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))


       
            const total = [...gameDB, ...gamefiltrado]

            return total
        }




    } catch (error) {
        console.log(error)

    }












































}




// try {
//     const dbvgames = await Videogame.findAll();
//     console.log("hola",dbvgames)
//     if (dbvgames.length) {
//         dbvgames = dbvgames.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
//         //  console.log(name)
//         if (!dbvgames.length) console.log("no hay nada en la base de datos")
//     let sname = name.split(' ').join('-').toLowerCase()
//     console.log(sname)
//     var apiresult = await axios.get(`https://api.rawg.io/api/games?search=${sname}&key=${key}&page_size=100`)
//     apiresult = apiresult.data.results




//     const game = apiresult.map(p => {
//         return {
//             id: p.id,
//             name: p.name,
//             year: p.released,
//             rating: p.rating,
//             platforms: p.platforms.map(e => { return e.platform.name }),
//             origin: "API",
//             image: p.background_image,
//             genres: p.genres.map(e => { return e.name })

//         }
//     })
//         //  console.log(game)
//         const gamefiltrado = game.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))

//         //  console.log("elfiltrado",gamefiltrado)
//         const total = [...dbvgames, ...game]
//         return total

//     }
//     ;
// } catch (error) {
//     console.log("hola3" + error);
//     return { msg: "No se encontro" };
// }

module.exports = { getByName };