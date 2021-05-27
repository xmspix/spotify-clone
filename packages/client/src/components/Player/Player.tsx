import React, { useEffect } from "react";
import "./player.scss";
import { useHistory } from "react-router-dom";
import { Store } from "../../Store";
import { createApiClient } from "../../api";
import player from "./playerController";

import {
  ShuffleButton,
  SkipPreviousButton,
  PlayButton,
  PauseButton,
  SkipNextButton,
  LoopButton,
} from "./PlayerButtons";

import { SpeakerOutlined } from "@material-ui/icons";

import { isMobile, iOS } from "../../utils/helper";

import { PlayerVolume, SongContainer } from "./PlayerComponents";

import { RangeTrack } from "../RangeInput";

type PlayerState = {
  current?: string;
  duration?: string;
};

const api = createApiClient();

const Player: React.FunctionComponent<PlayerState> = () => {
  const { state, dispatch } = React.useContext(Store);
  const { mediaPlaying, playlist, isPlaying, video } = state;
  const history = useHistory();

  useEffect(() => {
    let _player: HTMLAudioElement | null = document.querySelector("video");

    _player?.addEventListener("ended", handleNext);
    return () => {
      _player?.removeEventListener("ended", handleNext);
    };
  }, [mediaPlaying]);

  const setMedia = async (index: number) => {
    const audioData = await api.getAudio(playlist[index].id);
    dispatch({ type: "SET_MEDIA", payload: { ...playlist[index], url: audioData.url } });
    player.loadPlay();
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

  const PlayerContainer = () => {
    if (!isMobile) {
      return (
        <div className="player__controller">
          <RangeTrack class="player__controller__footer" id={2} player={player} />
          <PlayerButtons />
        </div>
      );
    } else {
      return (
        <div className="player__controller">
          <RangeTrack class="player__controller__footer" id={2} player={player} />
        </div>
      );
    }
  };

  const PlayerButtons = () => (
    <div
      className="player__controller__header"
      style={{ alignSelf: isMobile ? "center" : "", padding: isMobile ? "10px" : "" }}
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
  );

  const render = () => {
    if (!isMobile) {
      return (
        <>
          <SongContainer
            mediaPlaying={mediaPlaying}
            action={() => dispatch({ type: "SET_VIDEO", payload: true })}
          />
          {PlayerContainer()}
          <PlayerVolume />
        </>
      );
    } else {
      return (
        <>
          {PlayerContainer()}
          <SongContainer
            mediaPlaying={mediaPlaying}
            action={() => dispatch({ type: "SET_VIDEO", payload: true })}
          >
            {!isPlaying ? (
              <PlayButton callback={() => handlePlay()} />
            ) : (
              <PauseButton callback={() => handlePause()} />
            )}
          </SongContainer>
        </>
      );
    }
  };

  const playerClass = [!isMobile ? "player" : "mobilePlayer", mediaPlaying ? "" : "hide"].join(" ");
  return (
    <section className={playerClass} style={{ display: video ? "none" : "" }}>
      {render()}
    </section>
  );
};
export default Player;
