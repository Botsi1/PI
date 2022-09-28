const axios = require("axios")
const { key } = require("../../db");


const vgAPI = async () => {

    const promise1 = axios.get(`https://api.rawg.io/api/games?key=${key}&page=1&page_size=50`);
    const promise2 = axios.get(`https://api.rawg.io/api/games?key=${key}&page=2&page_size=50`);
    const promise3 = axios.get(`https://api.rawg.io/api/games?key=${key}&page=3&page_size=50`);

    await Promise.all([promise1, promise2, promise3])
        .then(function (values) {

            apiresult = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)

        })



    if (apiresult.length > 0) {

        var apivgames = apiresult.map(p => {


            return {
                id: p.id,
                name: p.name,
                image: p.background_image,
                rating: p.rating,
                genres: p.genres.map(e => { return e.name }),
                platform: p.platforms.map(e => { return e.platform.name }).toString(),
                origin: 'API'
            }
        })


    }

    return apivgames



}

module.exports = { vgAPI }




