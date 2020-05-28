import * as actionTypes from "../constants/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 3,
  error: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };

    case actionTypes.SET_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        totalPrice: 3,
        ingredients: {
          salad: action.payload.salad,
          bacon: action.payload.bacon,
          cheese: action.payload.cheese,
          meat: action.payload.meat,
        },
        error: false,
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
