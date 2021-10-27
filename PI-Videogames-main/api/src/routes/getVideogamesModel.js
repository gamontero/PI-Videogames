const { default: axios } = require("axios");
const e = require("express");
const {API_KEY} =process.env; 
require('dotenv').config(); 
const {Genre, Videogame} = require('../db')


const getApiInfo = async () => {

          
        const apiUrl1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
        const apiUrl2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
        const apiUrl3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
        const apiUrl4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
        const apiUrl5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
    
   const  multiApi = [apiUrl1, apiUrl2, apiUrl3, apiUrl4, apiUrl5 ]
   const apiGames = []; 

   await Promise.all(multiApi)
        .then(responses => {
            responses.forEach(responses => apiGames.push( 
                responses.data.results.map(game => { 
                    const {name, background_image, genres } = game;
                    return {
                        name,
                        background_image,
                        genres: genres.map(g => g.name)
                    }
                })

            ))
    })
        
    return apiGames.flat()
   }





const getdbInfo = async () => { 
    return await Videogame.findAll({
        include: [Genre]
    })
};

const getAllGames = async () => { 
    const apiG = await getApiInfo();
    const dbInfo = await getdbInfo();
    const allGames = apiG.concat(dbInfo);
    return allGames; 
};

const getGenre = async () => { 
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
        res.send(TotalGenres);

  
}

module.exports ={ 
    getAllGames,
    getGenre,
    
}