const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Info = require("./Info")
const {findGeneres} = require("../Controllers/Genres/DB.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames",Info)
router.get("/Genres" ,findGeneres)


module.exports = router;
