import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => {
  return (
    <>
      <div className={classes.Loader}>Loading...</div>
      <p style={{ textAlign: "center" }}>
        {props.payment ? "Processing payment..." : "Loading"}
      </p>
    </>
  );
};

export default spinner;
