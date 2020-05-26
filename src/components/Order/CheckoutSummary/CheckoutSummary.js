import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <h3>Total: ${(props.price + 2).toFixed(2)} ( + $2.00 delivery )</h3>
      </div>
      <Button variant="Danger" clicked={props.checkoutCancelled}>
        RETURN TO ORDER
      </Button>
      <Button variant="Success" clicked={props.checkoutContinued}>
        CONTINUE TO PAYMENT
      </Button>
    </div>
  );
};

export default checkoutSummary;
