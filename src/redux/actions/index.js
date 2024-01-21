import { GET_CART, GET_PRODUCTS } from "./types.js";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const axiosUrl = process.env.REACT_APP_AXIOS_URL;

export function getCarts() {
  try {
    const cookie = new Cookies();
    const cookieID = cookie.get("id");

    return async function (dispatch) {
      let results = await axios.get(`${axiosUrl}/api/cart/${cookieID}`);

      return dispatch({
        type: GET_CART,
        payload: results.data,
      });
    };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
      confirmButtonText: "Ok",
    });
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
    Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}
