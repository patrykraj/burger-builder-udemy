import React from "react";

import original from "../../assets/images/original.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={original} alt="logo" />
  </div>
);

export default logo;
