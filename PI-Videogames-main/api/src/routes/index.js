
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { default: axios } = require("axios");
const { Genre, Videogame} = require("../db");
const router = Router();
const { getAllGames, getGenre } = require("./getModels")





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req, res) => {
  const { name } = req.query; //no deberia traer por
  let allGames = await getAllGames();
  if (name) {
    let searchedGame = allGames.filter((game) => // tengo que poner await aca? 
      game.name.toLowerCase().includes(name.toLowerCase()));
    if (searchedGame.length >= 1) return res.status(200).send(searchedGame) // hay otra forma de escribirlo
    res.status(404).send("Game does not exist")
  } else {
    let allGames2 = await getAllGames()
    res.status(200).json(allGames2)
  }

});




router.get('/videogames/:id', async (req, res) => {
  
  let  id = req.params.id; //ojo que siempre me deben dar un param 
  console.log(id)
  if (typeof id !== "string") id.toString();
  try {
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id:id },
        include: Genre,
      });
      return res.json(gameDB);
    } else {

    const apiGamesResponse = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const apiGames = await apiGamesResponse.data
    if (apiGames.name) {
    const {name, background_image, genres, description, released, rating, platforms} = apiGames
    const gameDetails = {
        name,
        description,
        released,
        background_image,
        rating,
        genres, 
        platforms,
      }
     res.status(200).json(gameDetails);
    }}
  } catch (err) {
    res.status(404).json("Id not found");
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
    console.log(err)
    res.status(500).json(" problema con ruta genre")


  }

})

router.post('/videogames', async (req, res) => {
  const { name, description, releaseDate, rating, genres, platforms, created } = req.body;

  let gameCreated = await Videogame.create({
    name,
    description,
    releaseDate,
    rating,
    genres,
    created,
    platforms,

  });
  res.status(200).send("Your game has been saved")
})


module.exports = router;
