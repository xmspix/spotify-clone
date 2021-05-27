import React, { useEffect } from "react";
import { Store } from "../../Store";
import player from "../Player/playerController";
import "./style.scss";
import { createApiClient } from "../../api";
// import { RangeTrack } from "../Player/PlayerComponentsplayer={player}";
import { RangeTrack } from "../RangeInput";

import { ExpandMore, MoreHoriz } from "@material-ui/icons";
import { isMobile } from "../../utils/helper";
import {
  LoopButton,
  PauseButton,
  PlayButton,
  ShuffleButton,
  SkipNextButton,
  SkipPreviousButton,
} from "../Player/PlayerButtons";

interface Props {}

const api = createApiClient();

const VideoPlayer = (props: Props) => {
  const { state, dispatch } = React.useContext(Store);
  const { mediaPlaying, video, isPlaying, playlist } = state;

  useEffect(() => {
    player.setup({
      player: document.querySelector("video"),
      currentTimeElm: document.querySelector(".current"),
      durationTimeElm: document.querySelector(".duration"),
      sliderProgress: document.querySelector(".slider-progress"),
      sliderProgress2: document.querySelector(".slider-progress2"),
      sliderVolume: document.querySelector(".slider-volume"),
    });
  }, []);

  const handleHide = (): void => {
    dispatch({ type: "SET_VIDEO", action: false });
  };

  const setMedia = async (index: number) => {
    const audioData = await api.getAudio(playlist[index].id);
    dispatch({ type: "SET_MEDIA", payload: { ...playlist[index], url: audioData.url } });
    player.loadPlay();
    // player.play();
  };

  const handlePlay = () => {
    dispatch({ type: "SET_PLAYING", payload: true });
    player.play();
  };

  const handlePause = () => {
    dispatch({ type: "SET_PLAYING", payload: false });
    player.pause();
  };
  const handleNext = async () => {
    if (mediaPlaying.id) {
      let currentIndex = playlist.findIndex((e: any) => e.id === mediaPlaying.id);
      const next = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
      setMedia(next);
    }
  };

  const handleBack = async () => {
    if (mediaPlaying.id) {
      let currentIndex = playlist.findIndex((e: any) => e.id === mediaPlaying.id);
      const back = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
      setMedia(back);
    }
  };

  return (
    <div className="video-player" style={{ display: !video ? "none" : "" }}>
      <div className="video-player__top">
        <ExpandMore onClick={() => handleHide()} />
        {/* <button className="btn" onClick={()=>handleHide()}>Hide</button> */}
        <h6>{mediaPlaying.title}</h6>
        {/* <button>***</button> */}
        <MoreHoriz />
      </div>

      <video playsInline>
        <source src={mediaPlaying.url} type="video/mp4" />
        Your browser does not support HTML5 audio.
      </video>

      <div className="video-player__wrapper">
        <h1>{mediaPlaying.title}</h1>
        <h5>{mediaPlaying.artist}</h5>
      </div>

      <RangeTrack class="video-player__track" id={1} player={player} />

      <div
        className="video-player__buttons"
        // style={{ alignSelf: isMobile ? "center" : "", padding: isMobile ? "10px" : "" }}
      >
        <ShuffleButton
          callback={() => dispatch({ type: "SET_PLAYLIST", payload: player.shuffle() })}
        />
        <SkipPreviousButton callback={() => handleBack()} />

        {!isPlaying ? (
          <PlayButton callback={() => handlePlay()} />
        ) : (
          <PauseButton callback={() => handlePause()} />
        )}

        <SkipNextButton callback={() => handleNext()} />
        <LoopButton callback={() => player.loop()} />
      </div>
    </div>
  );
};

export default VideoPlayer;
