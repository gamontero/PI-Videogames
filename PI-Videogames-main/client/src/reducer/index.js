
const initialState = {
    videoGames: [],
    allVideoGames: [],
    genres: [],
    detail: [],
};


function rootReducer  (state = initialState, action) { 
    switch(action.type) {
        case "GET_VIDEOGAMES":
            return {
              ...state,
              videoGames: action.payload, //envio todo lo que esta en la accion 
              allVideoGames: action.payload,
            };
            default: 
                return state; 
          
    }

}

export default rootReducer; 