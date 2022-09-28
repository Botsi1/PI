const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo correspondiente a la tabla genre
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genero', {
      name: {
          type: DataTypes.STRING
      }
  },
  {timestamps:false}

  
  );
};