import React from "react";

import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = (
    <p>
      Ingredients:{" "}
      {props.ingredients
        ? Object.entries(props.ingredients).map(([ingredient, val]) => {
            return val ? (
              <span
                style={{
                  textTransform: "capitalize",
                  display: "inline-block",
                  margin: "0 8px",
                  border: "1px solid #ccc",
                  padding: "5px",
                }}
                key={ingredient}
              >
                {ingredient} &times;{val}{" "}
              </span>
            ) : null;
          })
        : null}
    </p>
  );

  return (
    <div className={classes.Order}>
      {ingredients}
      <p>
        Price: <strong>${Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
