import React, { useEffect } from "react";
import "./playlist.scss";
import { useHistory } from "react-router-dom";
import { createApiClient } from "../../api";
import SectionHeaderPlaylist from "../../components/SectionHeaderPlaylist";
import { Store } from "../../Store";

import { Favorite } from "@material-ui/icons";

import player from "../../components/Player/playerController";
import Container from "../../components/Container";

import VideoPlayer from "../../components/VideoPlayer";
import Playlists from "../Playlists";

type PlaylistState = {
  playlist?: PlayList[];
};
export interface PlayList {
  id: string;
  title: string;
  artist: string;
  uploadedAt: string;
  duration: string;
  artwork: string;
}

const api = createApiClient();

const Playlist: React.FunctionComponent<PlaylistState> = () => {
  const history = useHistory();
  const { state, dispatch } = React.useContext(Store);
  const { playlist, mediaPlaying, playlistData, like, video, search } = state;

  async function loadPlaylist() {
    const urlParams: any = new URLSearchParams(history.location.search);
    const pid: string = urlParams.get("pid");
    const id: string = urlParams.get("id");

    const playlistData = await api.getPlaylist(pid, id);
    dispatch({
      type: "SET_PLAYLIST",
      payload: playlistData,
    });

    // player.setup({
    //   player: document.querySelector("video"),
    //   currentTimeElm: document.querySelector(".current"),
    //   durationTimeElm: document.querySelector(".duration"),
    //   sliderProgress: document.querySelector(".slider-progress"),
    //   sliderVolume: document.querySelector(".slider-volume"),
    // })

    // Add playlist
    player.add(playlistData);
  }

  useEffect(() => {
    loadPlaylist();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPlay = async (song: PlayList) => {
    const audio = await api.getAudio(song.id);

    dispatch({ type: "SET_MEDIA", payload: { ...song, url: audio.url } });
    dispatch({ type: "SET_PLAYING", payload: true });

    player.loadPlay();
    // player.play();
  };

  const handleFavorites = (e: any) => {
    const index = like.findIndex((f: any) => f.id === e.id);
    if (index === -1) {
      dispatch({ type: "ADD_LIKE", payload: e });
    } else {
      dispatch({ type: "REMOVE_LIKE", payload: e });
    }
  };

  // if (search.length >= 1) {
  //   return <Playlists />;
  // } else {
    return (
      <>
        <VideoPlayer />
        {/* <Container> */}
        {/* <video controls style={{ display: !video ? "none" : "" }} playsInline>
        <source src={mediaPlaying.url} type="video/mp4" />
        Your browser does not support HTML5 audio.
      </video> */}
        {/* {playlistData && (
          <SectionHeaderPlaylist title={playlistData.title} artwork={playlistData.artwork} />
        )} */}
        <div className="playlist">
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Title</td>
                <td>Artist</td>
                <td>Duration</td>
              </tr>
            </thead>
            <tbody>
              {playlist &&
                playlist?.map((e: PlayList, i: number) => (
                  <tr key={i} className={mediaPlaying && mediaPlaying.id === e.id ? "active" : ""}>
                    <td>
                      <Favorite
                        style={{
                          fontSize: "14px",
                          fill: like.findIndex((f: any) => f.id === e.id) !== -1 ? "red" : "white",
                        }}
                        onClick={() => handleFavorites(e)}
                      />
                    </td>
                    <td onClick={() => onPlay(e)}>{e.title}</td>
                    <td onClick={() => onPlay(e)}>{e.artist}</td>
                    <td onClick={() => onPlay(e)}>{e.duration}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* </Container> */}
      </>
    );
  // }
};

export default Playlist;
