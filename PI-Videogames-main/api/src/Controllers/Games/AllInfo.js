const axios = require("axios")
const { key, Videogame, Genero } = require("../../db");



const getGameById = async (req, res) => {
  try {
    const id = req.params.id

    if (isNaN(id)) {

      const game = await Videogame.findAll({
        where: { id: id },
        include: [{
          model: Genero,
          attributes: ['name'],
          through: {
            attributes: []
          }

        }]

      })

      return game ? res.send(game) : res.status(400).send("No se pudo completar")


    } else {
      console.log("entro a la api")
      const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
      const info = api.data


      const game = {
        id: info.id,
        name: info.name,
        image: info.background_image,
        year: info.released,
        rating: info.rating,
        genres: info.genres.map(e => { return e.name }),
        platforms: info.platforms.map(e => { return e.platform.name }),
        description: info.description.replace(/<[^>]+>/g, ''),
      }

      return game ? res.send(game) : res.status(404).send("No se encontro el juego")



    }



  } catch (error) {
    console.log(error)

  }

}


const post = async (req, res) => {
  let { name, description, reldate, image, rating, platform, genre } = req.body;
  platform = platform.toString();
  console.log("mi imagen:", image)
  const addVgame = await Videogame.create({
    name,
    description,
    reldate,
    image,
    rating,
    platform,

  })

  //Find videogame genres from Genres table       
  const vg_genre = await Genero.findAll({
    where: { name: genre }
  })

  //Generate Table association Videogame-Genres link
  addVgame.addGenero(vg_genre)

  // console.log("el juego", addVgame)

  res.send('New video game has been added')
};






module.exports = { getGameById, post }

