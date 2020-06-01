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

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case actionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        // error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
