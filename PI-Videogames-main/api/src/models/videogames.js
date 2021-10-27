const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogames', {
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

    releasedate: {
      type: DataTypes.STRING,
  
      
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false, 
    },

    image: {
      type: DataTypes.TEXT
    },

    rating: {
      type: DataTypes.REAL, // decimal 
      
    },

    createdID: { //esto es hecho para mejor diferenciar los elementos de la api con los de la db
      type: DataTypes.BOOLEAN, // Es decir todos los que yo creo, tendran esta propiedad. 
      allowNull: false,
      defaultValue: true,
    },

  });
};
