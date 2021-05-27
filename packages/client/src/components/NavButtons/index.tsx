import React from "react";
import { useHistory } from "react-router-dom";
import "./navButtons.scss";

interface Props {}

const NavButtons = (props: Props) => {
  const history = useHistory();
  return (
    <div className="nav-buttons">
      <span className="nav-buttons__back" onClick={() => history.goBack()}>
        &lang;
      </span>
      <span className="nav-buttons__forward" onClick={() => history.goForward()}>
        &rang;
      </span>
    </div>
  );
};

export default NavButtons;
