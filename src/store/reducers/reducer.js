import * as actionTypes from "../actions/actions";

const initialState = {
  ingredients: null,
  totalPrice: 3,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };

    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload,
      };

    case actionTypes.SET_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
