import React, { useEffect, useState } from "react";
import "./playlists.scss";

import { createApiClient } from "../../api";
import SectionHeader from "../../components/SectionHeader";
import { Store } from "../../Store";
import Container from "../../components/Container";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card";
import { isMobile } from "../../utils/helper";
import SearchBox from "../../components/SearchBox";
type Props = {};

const api = createApiClient();

const Playlists: React.FunctionComponent<Props> = () => {
  const history = useHistory();
  const { state, dispatch } = React.useContext(Store);
  const { search } = state;

  const [data, setData] = useState({
    isLoaded: false,
    playlists: [],
  });

  async function anyNameFunction() {
    setData({
      playlists: await api.getSearch(search),
      isLoaded: true,
    });
  }

  useEffect(() => {
    // if (!search) history.push("/browse");
    if (search !== "") {
      // console.log("search:",search);
      anyNameFunction();
    }
  }, [search]);

  const sectionHeaderOptions: any = {
    title: "Playlists",
  };

  const handleClick = (itm: any) => {
    // console.log(itm);
    dispatch({ type: "SET_PLAYLIST_DATA", payload: itm });
    history.push(`/playlist?pid=${itm.pid}&id=${itm.id}`);
  };

  const { isLoaded, playlists } = data;

  // if (!isLoaded) {
  //   return <Container></Container>;
  // } else {
  // console.log(playlists);

  const playlistsData = () => {
    if (search.length >= 1) {
      return playlists.map((itm: any, i: number) => (
        <Card {...itm} callback={() => handleClick(itm)} key={i} />
      ));
    } else {
      return;
    }
  };

  return (
    <Container>
      <SectionHeader {...sectionHeaderOptions} />

      <div className="main__container__wrapper__cards">
        {isMobile && <SearchBox />}
        {playlistsData()}
      </div>
    </Container>
  );
};
// };

export default Playlists;
