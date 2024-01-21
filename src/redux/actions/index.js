import { GET_CART } from "./types.js";
import axios from "axios";
import Cookies from "universal-cookie";

export function getCarts() {
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const cookie = new Cookies();
  const cookieID = cookie.get("id");

  return async function (dispatch) {
    let results = await axios.get(`${axiosUrl}/api/cart/${cookieID}`);

    return dispatch({
      type: GET_CART,
      payload: results.data,
    });
  };
}
