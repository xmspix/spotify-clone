import React, { useEffect } from "react";
import { Store } from "../Store";
import { Favorite } from "@material-ui/icons";
import { createApiClient } from "../api";
import player from "../components/Player/playerController";
import Container from "../components/Container";
interface Props {}

interface PlayList {
  id: string;
  title: string;
  artist: string;
  uploadedAt: string;
  duration: string;
  artwork: string;
}

const api = createApiClient();

export const Liked = (props: Props) => {
  const { state, dispatch } = React.useContext(Store);
  let { mediaPlaying, like } = state;

  async function loadPlaylist() {
    dispatch({
      type: "SET_PLAYLIST",
      payload: like,
    });

    // Add playlist
    player.add(like);
  }

  useEffect(() => {
    loadPlaylist();
    return () => {};
  }, []);

  const handleFavorites = (e: any) => {
    const index = like.findIndex((f: any) => f.id === e.id);
    if (index === -1) {
      dispatch({ type: "ADD_LIKE", payload: e });
    } else {
      dispatch({ type: "REMOVE_LIKE", payload: e });
    }
  };

  const onPlay = async (song: PlayList) => {
    const audio = await api.getAudio(song.id);

    dispatch({ type: "SET_MEDIA", payload: { ...song, url: audio.url } });
    dispatch({ type: "SET_PLAYING", payload: true });

    player.loadPlay();
  };

  if (like.length === 0) {
    return <Container></Container>;
  } else {
    return (
      // <Container>
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
            {like?.map((e: PlayList, i: number) => (
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
      // </Container>
    );
  }
};

export default Liked;
