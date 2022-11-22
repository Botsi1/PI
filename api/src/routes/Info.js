const { Router } = require('express');
const router = Router()

const {getGameById,post} = require("../Controllers/Games/AllInfo")
const {allGames} = require("../Controllers/Games/Allgames")
const {getByName} = require("../Controllers/Games/ByName")

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const byName = await getByName(name);
            res.json(byName);
        } else {
            const allGam = await allGames();
            res.json(allGam);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "No se encontro el juego solicitado" });
    }
});




router.get("/:id",getGameById)
router.post("/",post)



module.exports = router
