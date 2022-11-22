const multer = require("multer")


const path = require("path")

module.exports = multer({


    storage: multer.diskStorage({}),

    fileFiler:(req,file,cb) =>{
        let ext =path.extname(file.originalname)






        if(ext !== ".jpg" && ext !==".jpeg" && ext !==".png"){
            cb(
                new Error(
                    "Introduzca formato valido"
                ),
                false
            );
            return
        }

        cb(null,true)

    },
})