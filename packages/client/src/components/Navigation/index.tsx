import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../../utils/helper";
import { Store } from "../../Store";
import "./navigation.scss";

import {
  HomeOutlined,
  FolderOutlined,
  RssFeedOutlined,
  SearchOutlined,
  Favorite,
} from "@material-ui/icons";

const Navigation = () => {
  const { state, dispatch } = React.useContext(Store);
  const { video } = state;

  const [pageState, setPageState] = useState({ menu: "Home" });

  const handleClick = (e: any) => {
    setPageState({ menu: e.currentTarget.innerText });
    dispatch({ type: "SET_SEARCH", payload: "" });
    // console.log("browse");
  };

  const { menu } = pageState;

  const NavButton = ({ name, to, icon }: any) => {
    let iconNav: any = "";
    switch (icon) {
      case "HomeOutlined":
        iconNav = <HomeOutlined />;
        break;
      case "FolderOutlined":
        iconNav = <FolderOutlined />;
        break;
      case "RssFeedOutlined":
        iconNav = <RssFeedOutlined />;
        break;
      case "SearchOutlined":
        iconNav = <SearchOutlined />;
        break;
      case "Favorite":
        iconNav = <Favorite />;
        break;
    }
    return (
      <Link to={to} onClick={(e) => handleClick(e)} className={menu === name ? "active" : ""}>
        {iconNav}
        <span>{name}</span>
      </Link>
    );
  };

  const Menu = () => {
    if (!isMobile) {
      return (
        <>
          <NavButton name={"Home"} to={"/"} icon={"HomeOutlined"} />
          {/* <NavButton name={"Browse"} to={"/browse"} icon={"FolderOutlined"} /> */}
          {/* <NavButton name={"Radio"} to={"/radio"} icon={"RssFeedOutlined"} /> */}
          <NavButton name={"Liked"} to={"/liked"} icon={"Favorite"} />
        </>
      );
    } else {
      return (
        <>
          <NavButton name={"Home"} to={"/"} icon={"HomeOutlined"} />
          <NavButton name={"Search"} to={"/playlists"} icon={"SearchOutlined"} />
          <NavButton name={"Liked"} to={"/liked"} icon={"Favorite"} />
        </>
      );
    }
  };

  return (
    <nav className="navigation" style={{ display: video && isMobile ? "none" : "" }}>
      <Menu />
    </nav>
  );
};
export default Navigation;
