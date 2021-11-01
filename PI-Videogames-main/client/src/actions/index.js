
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
 