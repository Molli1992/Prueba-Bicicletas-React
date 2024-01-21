import { GET_CART, GET_PRODUCTS } from "./types.js";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const axiosUrl = process.env.REACT_APP_AXIOS_URL;

export function getCarts() {
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

export function getProducts() {
  return async function (dispatch) {
    let results = await axios.get(axiosUrl + "/api/products");

    return dispatch({
      type: GET_PRODUCTS,
      payload: results.data,
    });
  };
}
