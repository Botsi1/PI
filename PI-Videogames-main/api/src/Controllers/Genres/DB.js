const axios = require("axios")
const { Genero, key } = require("../../db")


const db = async () => {
    try {
        const dbs = await Genero.findAll()
        if (!dbs.length) {
            const url = await axios.get(`https://api.rawg.io/api/genres?key=${key}`)


            const generos = url.data.results?.map((e) => {
                return {
                    name: e.name,
                }

            })

            await Genero.bulkCreate(generos, { validate: true })


            console.log("Base de datos creada",)


        } else { console.log("No se hizo de nuevo") }


    } catch (error) {
        console.log(error)

    }
}



const findGeneres = async (req, res) => {
    try {
        const db = await Genero.findAll()
        const generos = db.map(e => { return e.name })



        return generos ? res.status(200).send(generos) : res.status(400).send("Hubo un error en la base de datos")

    } catch (error) {
        console.log(error)

    }
}

module.exports = { db, findGeneres }