import React from "react";

import {
  Shuffle,
  SkipPrevious,
  PlayCircleFilledWhiteOutlined,
  PauseCircleFilledOutlined,
  SkipNext,
  LoopOutlined,
  // PauseCircleFilledRounded,
  // SpeakerOutlined,
} from "@material-ui/icons";

type ButtonProps = {
  callback?: any;
};

export const ShuffleButton: React.FC<any> = ({ callback }: ButtonProps) => (
  <Shuffle className={"icon icon_shuffle"} onClick={() => callback()} />
);

export const SkipPreviousButton: React.FC<any> = ({ callback }: ButtonProps) => (
  <SkipPrevious className={"icon icon_prev"} onClick={() => callback()} />
);

export const PlayButton: React.FC<any> = ({ callback }: ButtonProps) => (
  <PlayCircleFilledWhiteOutlined className={"icon icon_play"} onClick={() => callback()} />
);

export const PauseButton: React.FC<any> = ({ callback }: ButtonProps) => (
  <PauseCircleFilledOutlined className={"icon icon_pause"} onClick={() => callback()} />
);

export const SkipNextButton = ({ callback }: ButtonProps) => (
  <SkipNext className={"icon icon_next"} onClick={() => callback()} />
);
export const LoopButton: React.FC<any> = ({ callback }: ButtonProps) => (
  <LoopOutlined className={"icon icon_loop"} onClick={() => callback()} />
);

// export const PauseButton: React.FC<any> = ({ callback }: ButtonProps) => ()
