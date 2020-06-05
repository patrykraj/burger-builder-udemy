import React, { useState, useEffect } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios.orders";

import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.4,
  bacon: 1,
};

const BurgerBuilder = (props) => {
  const { initIngredients } = props;

  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    setPurchasable(sum > 0);
  };

  const handleAddIngredient = (type) => {
    const prevValue = props.ingredients[type];
    const updatedValue = prevValue + 1;
    const updatedIngredients = {
      ...props.ingredients,
    };
    updatedIngredients[type] = updatedValue;

    const priceAddition = INGREDIENT_PRICES[type];
    const prevPrice = props.totalPrice;
    const newPrice = prevPrice + priceAddition;

    props.setPrice(newPrice);
    props.updateIngredients(updatedIngredients);

    updatePurchaseState(updatedIngredients);
  };

  const handleRemoveIngredient = (type) => {
    const prevValue = props.ingredients[type];
    if (!prevValue) return;
    const updatedValue = prevValue - 1;
    const updatedIngredients = {
      ...props.ingredients,
    };
    updatedIngredients[type] = updatedValue;

    const priceDeduction = INGREDIENT_PRICES[type];
    const prevPrice = props.totalPrice;
    const newPrice = prevPrice - priceDeduction;

    props.setPrice(newPrice);
    props.updateIngredients(updatedIngredients);

    updatePurchaseState(updatedIngredients);
  };

  const handlePurchase = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const handleCancelPurchase = () => {
    setPurchasing(false);
  };

  const handleContinuePurchase = () => {
    const queryParams = [];
    for (let i in props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(props.ingredients[i])
      );
    }
    queryParams.push("price=" + props.totalPrice);
    const queryString = queryParams.join("&");

    props.onInitPurchase();
    props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  const disabledInfo = {
    ...props.ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  // if (state.loading) burger = <Spinner />;

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />{" "}
        <BuildControls
          handleAddIngredient={handleAddIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={purchasable}
          handlePurchase={handlePurchase}
          isAuth={props.isAuthenticated}
        />
      </>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        handleCancelPurchase={handleCancelPurchase}
        handleContinuePurchase={handleContinuePurchase}
        price={props.totalPrice}
      />
    );

    // if (this.state.loading) orderSummary = <Spinner payment={true} />;
  }

  return (
    <>
      <Modal show={purchasing} handleCancelPurchase={handleCancelPurchase}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateIngredients: (payload) =>
      dispatch(actions.updateIngredients(payload)),
    setPrice: (payload) => dispatch(actions.setPrice(payload)),
    initIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
