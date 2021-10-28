
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
const {getAllGames, getGenre} = require("./getModels")





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req, res) => {
    const {name} =req.query; //no deberia traer por
    let allGames = await getAllGames(); 
    if (name) { 
        let searchedGame =  allGames.filter((game) => // tengo que poner await aca? 
        game.name.toLowerCase().includes(name.toLowerCase())); 
        if (searchedGame.length >= 1) return res.status(200).send(searchedGame) // hay otra forma de escribirlo
            res.status(404).send("Game does not exist")
    } else { 
        let allGames2 = await getAllGames()
        res.status(200).json(allGames2)
    }

}); 




router.get('/videogame/:id', async (req, res) => {
    const { id } =req.params; //ojo que siempre me deben dar un param 
    try {
        if (id.includes("-")) {
          const gameDB = await Videogame.findOne({
            where: { id },
            include: [Genre],
          });
          return res.json(gameDB);
        }
    
        const gameAPI = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        res.json(gameAPI.data);
      } catch (err) {
        res.status(404).json({ error: "Id not found" });
      }
    });
    
  


router.get('/genres', async (req, res) => {
     try {
        const genreApi = await axios.get(` https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genre = genreApi.data.results;
        genre.forEach(async (g) => {
            await Genre.findOrCreate({
                where: {
                    name: g.name 
                }
            })
        });
        const TotalGenres = await Genre.findAll(); 
        
         

      res.status(200).json(TotalGenres)


    } 
    catch (err) { 
        res.status(500).json(" problema con ruta genre")


    }

})

// router.post('/videogame', async (req, res) => {
//     const { name, description, releaseDate, rating, genres, platforms, created} = req.body; 


//     res.status(200).send("Your game has been saved")
// })


module.exports = router;
