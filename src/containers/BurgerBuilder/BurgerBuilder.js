import React, { Component } from "react";

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

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    // loading: true,
    // error: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((acc, el) => {
        return acc + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  handleAddIngredient = (type) => {
    const prevValue = this.props.ingredients[type];
    const updatedValue = prevValue + 1;
    const updatedIngredients = {
      ...this.props.ingredients,
    };
    updatedIngredients[type] = updatedValue;

    const priceAddition = INGREDIENT_PRICES[type];
    const prevPrice = this.props.totalPrice;
    const newPrice = prevPrice + priceAddition;

    this.props.setPrice(newPrice);
    this.props.updateIngredients(updatedIngredients);

    this.updatePurchaseState(updatedIngredients);
  };

  handleRemoveIngredient = (type) => {
    const prevValue = this.props.ingredients[type];
    if (!prevValue) return;
    const updatedValue = prevValue - 1;
    const updatedIngredients = {
      ...this.props.ingredients,
    };
    updatedIngredients[type] = updatedValue;

    const priceDeduction = INGREDIENT_PRICES[type];
    const prevPrice = this.props.totalPrice;
    const newPrice = prevPrice - priceDeduction;

    this.props.setPrice(newPrice);
    this.props.updateIngredients(updatedIngredients);

    this.updatePurchaseState(updatedIngredients);
  };

  handlePurchase = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  handleCancelPurchase = () => {
    this.setState({
      purchasing: false,
    });
  };

  handleContinuePurchase = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");

    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    // if (this.state.loading) burger = <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />{" "}
          <BuildControls
            handleAddIngredient={this.handleAddIngredient}
            handleRemoveIngredient={this.handleRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            handlePurchase={this.handlePurchase}
            isAuth={this.props.isAuthenticated}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          handleCancelPurchase={this.handleCancelPurchase}
          handleContinuePurchase={this.handleContinuePurchase}
          price={this.props.totalPrice}
        />
      );

      // if (this.state.loading) orderSummary = <Spinner payment={true} />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          handleCancelPurchase={this.handleCancelPurchase}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

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
    setIngredients: (payload) => dispatch(actions.setIngredients(payload)),
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
