import React from "react";

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {ingredientKey}:
          </span>{" "}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );

  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger with:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout</p>
      <Button variant="Danger" clicked={props.handleCancelPurchase}>
        CANCEL
      </Button>
      <Button variant="Success" clicked={props.handleContinuePurchase}>
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;
