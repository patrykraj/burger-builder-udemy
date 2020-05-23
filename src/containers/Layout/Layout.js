import React, { useState } from "react";

import Aux from "../../hoc/Auxs/Aux";
import Content from "./Layout.css";
import Toolbar from "../../components/Burger/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Burger/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  let [showSideDrawer, toggleShowSideDrawer] = useState(false);

  return (
    <Aux>
      <Toolbar toggleSideDrawer={() => toggleShowSideDrawer} />
      <SideDrawer
        open={showSideDrawer}
        toggleSideDrawer={() => toggleShowSideDrawer(false)}
      />
      <Content>{props.children}</Content>
    </Aux>
  );
};

export default Layout;
