import { GET_CART, GET_PRODUCTS } from "./types.js";
import axios from "axios";
import Cookies from "universal-cookie";

const axiosUrl = process.env.REACT_APP_AXIOS_URL;
const cookie = new Cookies();
const cookieID = cookie.get("id");

export function getCarts() {
  try {
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
