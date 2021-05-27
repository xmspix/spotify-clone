import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isMobile } from "./utils/helper";

import LeftSidebar from "./components/LeftSidebar";
import Player from "./components/Player/Player";
// import RightSidebar from "./components/RightSidebar";
import Browse from "./pages/Browse";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";
import Liked from "./pages/Liked";
import Navigation from "./components/Navigation";
import VideoPlayer from "./components/VideoPlayer";
import Header from "./components/Header";

import { Store } from "./Store";

interface AppState {}

const App: React.FunctionComponent<AppState> = () => {
  const { state, dispatch } = React.useContext(Store);
  const { playlist, mediaPlaying, playlistData, like, video } = state;
  return (
    <Router>
      <section className="wrapper">
        <LeftSidebar />
        <VideoPlayer />
        <div className="main">
          <section className="main__container">
            <Header />
            <div className="main__container__wrapper">
              <Switch>
                <Route path="/playlists">
                  <Playlists />
                </Route>
                <Route path="/playlist">
                  <Playlist />
                </Route>
                <Route path="/browse">
                  <Browse />
                </Route>
                <Route path="/liked">
                  <Liked />
                </Route>
                {/* <Route path="/video">
                  <VideoPlayer />
                </Route> */}
                <Route path="/">
                  <Browse />
                </Route>
              </Switch>
            </div>
          </section>
        </div>
        {/* <RightSidebar /> */}
      </section>
      {isMobile && <Navigation />}
      <Player />
    </Router>
  );
};

export default App;
