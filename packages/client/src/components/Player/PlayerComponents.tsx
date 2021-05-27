import React from "react";
import player from "./playerController";
import { SpeakerOutlined } from "@material-ui/icons";

// type IRange = {
//   class?: string;
//   id?: number;
//   callback?: any;
//   children?: any;
// };

type TSong = {
  children?: any;
  action?: any;
  mediaPlaying?: any;
};

// export const RangeTrack = (props?: IRange) => (
//   <div className={props?.class}>
//     <small className="current"></small>
//     <input
//       type="range"
//       onInput={(e) => player.skip(e)}
//       step="0.05"
//       className={props?.id === 1 ? "slider slider-progress" : "slider slider-progress2"}
//     />
//     <small className="duration"></small>
//   </div>
// );

export const PlayerVolume = () => (
  <div className="player__audio">
    <SpeakerOutlined />
    <div className="range">
      <input
        type="range"
        name="range"
        min="0"
        max="1"
        onInput={(e) => player.volume(e)}
        step="0.05"
        className={"slider slider-volume"}
      />
    </div>
  </div>
);

export const SongContainer = (props?: TSong) => (
  <div className="player__wrapper">
    <div className="player__wrapper__songContainer" onClick={() => props?.action()}>
      {props?.mediaPlaying.id && (
        <img
          src={props.mediaPlaying.artwork}
          alt={props.mediaPlaying.title}
          className="player__wrapper__songContainer__cover"
        />
      )}
      <div className="player__wrapper__songContainer__song">
        <span className="player__wrapper__songContainer__song__title">
          {props?.mediaPlaying.title}
        </span>
        <span className="player__wrapper__songContainer__song__artist">
          {props?.mediaPlaying.artist}
        </span>
      </div>
    </div>
    {props?.children}
  </div>
);
