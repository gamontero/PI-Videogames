
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
const {getAllGames, getGenre} = require("./getVideogamesModel")





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req, res) => {
    const {name} =req.query; //no deberia traer por
    let allGames = getAllGames(); 
    if (name) { 
        let searchedGame = await allGames.filter((game) => // tengo que poner await aca? 
        game.name.toLowerCase().includes(name.toLowerCase())); 
        if (searchedGame.length >= 1) return res.status(200).send(searchedGame) // hay otra forma de escribirlo
            res.status(404).send("Game does not exist")
    } else { 
        let allGames2 = await getAllGames()
        res.status(200).send(allGames2)
    }

}); 

// router.get('/videogame')



// router.get('/videogame/:id', async (req, res) => {
//     const { id } =req.params; //ojo que siempre me deben dar un param 
//     try {

//     } catch { 
//         res.status(404).json("id not found"); 
//     }

// });

// router.get('/genres', async (req,res) => {
//     try {
//         await getGenre()


//     } catch (err) { 
//         res.status(500).json(" problema con ruta genre")


//     }

// })

// router.post('/videogame', async (req, res) => {
//     const { name, description, releaseDate, rating, genres, platforms, created} = req.body; 


//     res.status(200).send("Your game has been saved")
// })


module.exports = router;
