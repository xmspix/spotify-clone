import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Redirect,
} from "react-router-dom";
import { isMobile } from "./utils/helper";

import LeftSidebar from "./components/LeftSidebar";
import Player from "./components/Player/Player";
import Browse from "./pages/Browse";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";
import Liked from "./pages/Liked";
import Navigation from "./components/Navigation";
import VideoPlayer from "./components/VideoPlayer";
import Header from "./components/Header";

interface AppState {}

const App: React.FunctionComponent<AppState> = () => {
  const content = (
    <>
      <section className="wrapper">
        <LeftSidebar />
        <VideoPlayer />
        <div className="main">
          <section className="main__container">
            <Header />
            <div className="main__container__wrapper">
              <Switch>
                <Route path="/playlists" component={Playlists} />
                <Route path="/playlist" component={Playlist} />
                <Route path="/browse" component={Browse} />
                <Route path="/liked" component={Liked} />
                <Route path="/" component={Browse} />
              </Switch>
            </div>
          </section>
        </div>
      </section>
      {isMobile && <Navigation />}
      <Player />
    </>
  );

  if (window.location.pathname.includes("index.html")) {
    return <HashRouter>{content}</HashRouter>;
  } else {
    return <Router>{content}</Router>;
  }
};

export default App;
