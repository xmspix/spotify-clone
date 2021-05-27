import React, { Component } from "react";
import "./library.scss";

import { Link } from "react-router-dom";

interface Props {}

interface State {}

export default class Library extends Component<Props, State> {
  render() {
    return (
      <nav className="library">
        <Link to="/">Made For You</Link>
        <Link to="/">Recently Played</Link>
        <Link to="/liked">Liked Songs</Link>
        <Link to="/">Albums</Link>
        <Link to="/">Artist</Link>
        <Link to="/">Podcasts</Link>
      </nav>
    );
  }
}
