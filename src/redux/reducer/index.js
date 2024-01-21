import { GET_CART, GET_PRODUCTS } from "../actions/types.js";

const initialState = {
  cart: [],
  products: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
