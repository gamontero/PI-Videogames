const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: { // tengo que configurar el id para que no choque con el de la api 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      allowNull: false, 
      primaryKey: true 

    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
   
  });
};