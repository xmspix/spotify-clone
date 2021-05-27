import React, { Component } from "react";
import { isMobile } from "../utils/helper";
import Header from "./Header";
import { Store } from "../Store";

interface Props {
  children?: any;
}

const Container = ({ children }: Props) => {
  const { state, dispatch } = React.useContext(Store);
  const { playlist, mediaPlaying, playlistData, like, video } = state;

  return (
    <div className="main" style={{ display: video ? "none" : "" }}>
      <section className="main__container">
        {/* <Header /> */}
        <div className="main__container__wrapper">{children}</div>
      </section>
    </div>
  );
};

export default Container;
