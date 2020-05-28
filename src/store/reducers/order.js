import * as actionTypes from "../constants/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.payload.orderData,
        id: action.payload.id,
      };

      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [...state.orders, newOrder],
      };

    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
