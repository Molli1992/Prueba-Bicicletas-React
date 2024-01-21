import { GET_CART, GET_PRODUCTS } from "./types.js";
import axios from "axios";
import Cookies from "universal-cookie";

export function getCarts() {
  try {
    let axiosUrl = process.env.REACT_APP_AXIOS_URL;
    let cookie = new Cookies();
    let cookieID = cookie.get("id");

    return async function (dispatch) {
      let results = await axios.get(`${axiosUrl}/api/cart/${cookieID}`);

      return dispatch({
        type: GET_CART,
        payload: results.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getProducts() {
  try {
    let axiosUrl = process.env.REACT_APP_AXIOS_URL;

    return async function (dispatch) {
      let results = await axios.get(axiosUrl + "/api/products");

      return dispatch({
        type: GET_PRODUCTS,
        payload: results.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}
