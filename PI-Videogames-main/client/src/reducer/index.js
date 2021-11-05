
const initialState = {
  videoGames: [],
  allVideoGames: [],
  genres: [],
  detail: [],
  platforms: [],
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videoGames: action.payload, //envio todo lo que esta en la accion 
        allVideoGames: action.payload, // OJO esto es para siempre tener una copia del estado y no se me borre cuando los filte
        platforms: action.payload.map((el) => el.platforms)
        
      };


    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_NAME_VIDEOGAME":
      return {
        ...state,
        videoGames: action.payload,
      };


    case "POST_VIDEOGAME": // creo que puedo borrar esto 
      return {
        ...state,

      };


    case "FILTER_BY_GENRE": // logica siempre antes del return 
       const videoGamesFiltered =
        action.payload === "all"
          ? state.allVideoGames
          : state.videoGames.filter((g) => g.genres.includes(action.payload))
      return {
        ...state,
        videoGames: videoGamesFiltered,
      };

    case "FILTER_CREATED":
      const allVideoGames = state.videoGames
      const createdFilter = action.payload === "created" ? allVideoGames.filter((g) => g.createdID) : allVideoGames.filter((g) => !g.createdID);
      return {
        ...state,
        videoGames: action.payload === 'all' ? state.allVideoGames : createdFilter
      }

    case "ORDER_BY_NAME":
      let sort =
        action.payload === "asc"
          ? state.allVideoGames.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          : state.allVideoGames.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        videoGames: sort,
      };


    case "ORDER_BY_RATING":
      let sortRating =
        action.payload === "low"
          ? state.videoGames.sort(function (a, b) {
            if (a.rating > b.rating) {
              return 1;
            }
            if (b.rating > a.rating) {
              return -1;
            }
            return 0;
          })
          : state.videoGames.sort(function (a, b) {
            if (a.rating > b.rating) {
              return -1;
            }
            if (b.rating > a.rating) {
              return 1;
            }
            return 0;
          });

      return {
        ...state,
        videoGames: sortRating,
      };

        case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };




    default:
      return state;

  }

}

export default rootReducer;