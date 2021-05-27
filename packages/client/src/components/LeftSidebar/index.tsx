import React, { Component } from "react";
import "./LeftSidebar.scss";
import Navigation from "../Navigation";
import Library from "../Library";
interface Props {}
interface State {}

export default class LeftSidebar extends Component<Props, State> {
  state = {};

  render() {
    return (
      <aside className="left-sidebar">
        <Navigation />

        {/* <span className="left-sidebar__title">Your Library</span>
        <Library /> */}

        {/* <span className="left-sidebar__title">Playlists</span>
        <ul className="left-sidebar__playlist">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul> */}
      </aside>
    );
  }
}
