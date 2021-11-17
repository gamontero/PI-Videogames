
import axios from "axios";

export function getVideoGames() {
  return function (dispatch) {
    return axios.get("/videogames")
      .then((response) => {
        dispatch({
          type: "GET_VIDEOGAMES",
          payload: response.data,
        });

      })
      .catch((error) => {
        alert("Get VideoGames not Working")
      }
      )
  }
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
      try {
        var info = await axios.get("/genres", {});
        return dispatch({ type: "GET_GENRES", payload: info.data });
      } catch (error) {
        alert("Genre Not Found")
      }
    }
  }

  export function postVideoGame(payload) {
    return async function () {
      try {
        const response = await axios.post("/videogames", payload);
        return response;
      } catch (error) {
        alert("Post Not Working")
      }
    }
  }


  export function filterCreatedDB(payload) {
    return {
      type: "FILTER_CREATED",
      payload,
    };
  }

  export function filterByGenre(payload) {
    return {
      type: "FILTER_BY_GENRE",
      payload,

    };
  }


  export function filterByPlatform(payload) {
    return {
      type: "FILTER_BY_PLATFORM",
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
    console.log(id)

    if (id) {
      return async function (dispatch) {
        try {
          let gameDetail = await axios.get(`/videogames/id?id=${id}`);
          
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


