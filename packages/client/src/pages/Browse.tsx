import React, { useEffect, useState } from "react";
import { createApiClient, category } from "../api";
import { useHistory } from "react-router-dom";

import Container from "../components/Container";

// import cover from "../assets/cover.jpeg";
import { Store } from "../Store";

import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import { isMobile } from "../utils/helper";
import SearchBox from "../components/SearchBox";
import Playlists from "./Playlists";

type BrowseState = {};

const api = createApiClient();

const Browse: React.FunctionComponent<BrowseState> = () => {
  const { state, dispatch } = React.useContext(Store);
  const { search } = state;
  const history = useHistory();

  const [pageState, setPageState] = useState({
    categories: category,
    isLoaded: false,
  });

  useEffect(() => {
    setPageState({
      categories: category,
      isLoaded: true,
    });
    return () =>
      setPageState({
        categories: [],
        isLoaded: false,
      });
  }, []);

  const { categories, isLoaded } = pageState;

  if (search.length >= 1) {
    // history.push("/playlists");
    return <Playlists />;
  } else {
    const handleClick = (e: any) => {
      dispatch({ type: "SET_MENU", payload: "Playlist" });
      dispatch({ type: "SET_SEARCH", payload: e.currentTarget.innerText });
      history.push("/playlists");
    };

    const sectionHeaderOptions: any = {
      title: "Browse",
      links: [
        { name: "Genres & moods", class: "active" },
        // { name: "Podcasts", class: "" },
        // { name: "Charts", class: "" },
        // { name: "New Releases", class: "" },
        // { name: "Discover", class: "" },
        // { name: "Concerts", class: "" },
      ],
    };

    const getCategories = () => {
      return categories.map((e: any, i: number) => (
        <Card {...e} key={i} callback={(e: any) => handleClick(e)} />
      ));
    };

    return (
      <div className="browse">
        <SectionHeader {...sectionHeaderOptions} />
        <div className="main__container__wrapper__title">title</div>
        <div className="main__container__wrapper__cards">{getCategories()}</div>
      </div>
    );
  }
};

export default Browse;
