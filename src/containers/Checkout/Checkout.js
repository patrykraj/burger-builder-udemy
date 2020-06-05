import React from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import * as actions from "../../store/actions/";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

const Checkout = (props) => {
  // state = {
  //   ingredients: null,
  //   price: 0,
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients, totalPrice: price });
  // }

  // componentWillMount() {
  //   if (!this.props.ingredients) {
  //     this.props.history.goBack();
  //   }
  // }

  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let checkoutSummary = <Redirect to="/" />;

  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    checkoutSummary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          price={props.price}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </>
    );
  }

  return <div>{checkoutSummary}</div>;
};

const mapStateToProps = (state) => {
  return {
    price: state.burgerBuilder.totalPrice,
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
