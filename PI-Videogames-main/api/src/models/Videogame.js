const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: { // tengo que configurar el id para que no choque con el de la api 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, 
      primaryKey: true 

    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    description: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      
    },

    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
      
    },


    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false, 
    },
          
    rating: {
      type: DataTypes.REAL, // decimal
      allowNull: true,
      
    },

    createdID: { //esto es hecho para mejor diferenciar los elementos de la api con los de la db
      type: DataTypes.BOOLEAN, // Es decir todos los que yo creo, tendran esta propiedad. 
      allowNull: false,
      defaultValue: true,
    },

  });
};
