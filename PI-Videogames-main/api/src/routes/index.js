
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
const { default: axios } = require("axios");
const { Genre, Videogame } = require("../db");
const router = Router();
const { getAllGames } = require("./getModels")


//-------------------------------------------------------------------------------------


router.get('/videogames', async (req, res) => {
  const { name } = req.query; 
  try {
  let allGames = await getAllGames();
  if (name) {
    let searchedGame = allGames.filter((game) => 
      game.name.toLowerCase().includes(name.toLowerCase()));
    if (searchedGame.length >= 1) return res.status(200).send(searchedGame) 
    res.status(404).send("Game does not exist")
  } else {
    let allGames2 = await getAllGames()
    res.status(200).json(allGames2)
  }
  } catch (error) {
    res.status(500).json("Get Videogames Route Problems"); 
  }
});

//-------------------------------------------------------------------------------------


router.get('/videogames/id', async (req, res) => {
  const {id} = req.query;
  
  if (typeof id !== "string") id.toString();

  try {
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id: id },
        include: [Genre],
      });

      return res.json(gameDB);

    } else {
      const apiGamesResponse = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const apiGames = await apiGamesResponse.data
      if (apiGames.name) {
        const { name, background_image, genres, description, released, rating, platforms } = apiGames
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
      }
    }
  } catch (err) {
    res.status(404).json("Id not found");
  }
});


//--------------------------------------------------------------------------------------------------------------------

router.get('/genres', (req, res) => {
  try {
    axios.get(` https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((response) => {

        const genre = response.data.results;
        const genre2 = genre.map((g) => g.name);
        genre2.forEach(async (g) => {
          await Genre.findOrCreate({
            where: {
              name: g
            }
          })
          return Genre.findAll({
            attributes: ["name"]
          });
        })
        return res.status(200).json(genre2)

      })
  } catch (err) {
    res.status(500).json(" problema con ruta genre")
  }
})

//-------------------------------------------------------------------------------------------------------------------

router.post('/videogames', async (req, res) => {
  const { name, description, releaseDate, rating, genres, platforms, created } = req.body;
try {
  let gameCreated = await Videogame.create({
    name,
    description,
    releaseDate,
    rating,
    created,
    platforms,

  });
console.log(gameCreated)
  let dbGenre = await Genre.findAll({
    where: { name: genres },
  });

  gameCreated.addGenres(dbGenre);

  res.status(200).send("Your game has been saved")
} catch {
  res.status(500).send("Problems Route Post")
}
})


module.exports = router;
