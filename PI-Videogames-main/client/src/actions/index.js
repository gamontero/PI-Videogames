
import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var json = await axios.get("/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getNameVideoGame(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/videogames?name=" + name);

      return dispatch({
        type: "GET_NAME_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      alert("Game Not Found");
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var info = await axios.get("/genres", {});
    return dispatch({ type: "GET_GENRES", payload: info.data });
  };
}


export function postVideoGame(payload) {
  console.log(payload)
  return async function (dispatch) {
    const response = await axios.post("/videogames", payload);
    return response;
  };
}

export function filterCreatedDB(payload) {
 
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterByGenre(payload) {
  console.log(payload)
    return {
    type: "FILTER_BY_GENRE",
    payload,
    
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getDetail(id) {
  
  if (id) {
    return async function (dispatch) {
      try {
        let gameDetail = await axios.get("/videogames/" + id);
          dispatch({
          type: "GET_DETAIL",
          payload: gameDetail.data
        });
      } catch (error) {
          alert("Game Not Found Front") 
      }
    };
  }
  return {
    type: "RESET",
  };
}


 