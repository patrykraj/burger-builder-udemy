import React, { useState } from "react";
import { connect } from "react-redux";

// import Aux from "../../hoc/Auxs/Aux";
import Content from "./Layout.css";
import Toolbar from "../../components/Burger/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Burger/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  let [showSideDrawer, toggleShowSideDrawer] = useState(false);

  return (
    <>
      <Toolbar
        isAuth={props.isAuthenticated}
        toggleSideDrawer={() => toggleShowSideDrawer}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        toggleSideDrawer={() => toggleShowSideDrawer(false)}
      />
      <Content>{props.children}</Content>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
