import * as actionTypes from "../constants/actionTypes";
import axios from "../../axios.orders";

// export const getIngredients = (payload) => {
//   return {
//     type: actionTypes.GET_INGREDIENTS,
//     payload,
//   };
// };

export const updateIngredients = (payload) => {
  return {
    type: actionTypes.UPDATE_INGREDIENTS,
    payload,
  };
};

export const setPrice = (payload) => {
  return {
    type: actionTypes.SET_PRICE,
    payload,
  };
};

export const setIngredients = (payload) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://burger-builder-e3e3b.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
