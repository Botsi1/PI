const axios = require("axios")
const { key, Videogame, Genero } = require("../../db");



const getGameById = async (req, res) => {
  try {
    const id = req.params.id


    var searchdbvg = await Videogame.findAll({
      include: [{
        model: Genero,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }]
    });
    
    const gamefilt = searchdbvg.filter(e => e.id === id)



    if (gamefilt.length) {

      
      const objdbgame = gamefilt.map(e => {
        return {
          id: e.id,
          name: e.name,
          platforms: e.platform, //platform
          year: e.reldate, //reldate
          image: "https://t3.ftcdn.net/jpg/01/56/15/04/240_F_156150461_J6D7WvT6Xh80EHxze96PC7ZSnsLW0dE9.jpg",
          description: e.description,
          rating: e.rating,
          genres: e.generos.map((e) => e.name).toString()

        }
      })
     
      return res.status(200).send(objdbgame[0])


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



      return info ? res.send(game) : res.status(404).send("no existe el juego")






      // return res.status(404).send('Videogame not found');
    }


  } catch (error) {
    console.log(error)

  }
}


const post = async (req, res) => {
  let { name, description, reldate, image, rating, platform, genre } = req.body;
  platform = platform.toString();
  console.log("mi imagen:",image)
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

