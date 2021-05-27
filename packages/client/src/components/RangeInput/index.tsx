import React from "react";
import "./style.scss";

type IRange = {
  class?: string;
  id?: number;
  callback?: any;
  children?: any;
  player?: any;
};

export const RangeTrack = (props?: IRange) => (
  <div className={props?.class}>
    <small className="current"></small>
    <input
      type="range"
      onInput={(e) => props?.player.skip(e)}
      step="0.05"
      className={props?.id === 1 ? "slider slider-progress" : "slider slider-progress2"}
    />
    <small className="duration"></small>
  </div>
);
