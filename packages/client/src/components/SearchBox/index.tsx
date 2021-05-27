import React, { useContext } from "react";
import "./searchBox.scss";
import { Store } from "../../Store";
import { useHistory } from "react-router-dom";
import { Search } from "@material-ui/icons";

export default function SearchBox() {
  const { state, dispatch } = useContext(Store);
  const { search } = state;
  const history = useHistory();

  let searchDebounce: any = null;

  const onSearch = async (value: string, newPage?: number) => {
    clearTimeout(searchDebounce);

    searchDebounce = setTimeout(async () => {
      // console.log(value);

      if (value.length >= 1) {
        dispatch({ type: "SET_SEARCH", payload: value });

        if(history.location.pathname !== "/playlists"){
          history.push(`/playlists`);
        }
      }

      // history.push("/playlists");
    }, 300);
  };

  return (
    <div className="search">
      <Search className="btn-search" />
      <input type="text" placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
}
