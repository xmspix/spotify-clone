type Setup = {
  player?: any;
  currentTimeElm?: any;
  durationTimeElm?: any;
  sliderProgress?: any;
  sliderProgress2?: any;
  sliderVolume?: any;
};

type Add = {
  playlist: any[];
};

const settings = {
  fill: "#B3B3B3",
  fillOnHover: "#00C458",
  background: "#404040",
};

class Player {
  private playlist: any = [];

  private player: HTMLVideoElement | null = null;
  private currentTimeElm: HTMLElement | null = null;
  private durationTimeElm: HTMLElement | null = null;
  private sliderProgress: HTMLProgressElement | null = null;
  private sliderProgress2: HTMLProgressElement | null = null;
  private sliderVolume: HTMLProgressElement | null = null;

  ready() {
    return this.player !== null &&
      this.currentTimeElm !== null &&
      this.durationTimeElm !== null &&
      this.sliderProgress !== null &&
      this.sliderVolume !== null
      ? true
      : false;
  }

  setup({
    player,
    currentTimeElm,
    durationTimeElm,
    sliderProgress,
    sliderVolume,
    sliderProgress2,
  }: Setup) {
    this.player = player;
    this.currentTimeElm = currentTimeElm;
    this.durationTimeElm = durationTimeElm;
    this.sliderProgress = sliderProgress;
    this.sliderProgress2 = sliderProgress2;
    this.sliderVolume = sliderVolume;
    this.addEventListener();

    // console.log("setup");
    // console.log({
    //   player,
    //   currentTimeElm,
    //   durationTimeElm,
    //   sliderProgress,
    //   sliderProgress2,
    //   sliderVolume,
    // });
  }

  add(playlist: Add) {
    this.playlist = playlist;
  }

  audioElement() {
    return this.player;
  }

  loadPlay(duration?: number) {
    this.player?.load();
    // setTimeout(() => this.player?.play(), 200);
  }

  play(): void {
    this.player?.play();
    // this.player!.paused ? this.player!.play() : this.player!.pause();
  }

  pause() {
    this.player?.pause();
  }

  prev() {}

  next(song?: any) {
    // console.log("next song index: ", song);
  }

  volume(e: any) {
    this.player && (this.player.volume = e.target.value);
    applyFill(this.sliderVolume!);
  }

  shuffle() {
    if (this.playlist?.length >= 1) {
      const shuffled = getShuffledArr(this.playlist);
      this.playlist = shuffled;
      return getShuffledArr(this.playlist);
    }

    function getShuffledArr(arr: any[]): any[] {
      if (arr.length === 1) {
        return arr;
      }
      const rand = Math.floor(Math.random() * arr.length);
      return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i !== rand))];
    }
  }

  loop() {}

  skip(e: any) {
    this.player && (this.player.currentTime = e.target.value);
    applyFill(this.sliderProgress!);
  }

  timeConvert(time: number) {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.floor(time % 60);

    const hh = hours < 10 ? "0" + hours : hours;
    const mm = minutes < 10 ? "0" + minutes : minutes;
    const ss = seconds < 10 ? "0" + seconds : seconds;

    const hhh = hh >= 1 ? hh + ":" : "";

    return `${hhh}${mm}:${ss}`;
  }

  getPlaylist() {
    return this.playlist;
  }

  paused(): void {
    this.player!.paused ? this.player!.play() : this.player!.pause();
  }

  addEventListener() {
    this.player?.addEventListener("loadedmetadata", (event: any) => {
      this.durationTimeElm &&
        (this.durationTimeElm.innerText = this.timeConvert(event.target.duration));

      this.durationTimeElm &&
        (this.durationTimeElm.innerText = this.timeConvert(this.player?.duration!));

      this.play();
    });

    this.player?.addEventListener("timeupdate", () => {
      this.sliderProgress && (this.sliderProgress.value = this.player?.currentTime!);
      this.sliderProgress && (this.sliderProgress.max = this.player?.duration!);
      this.sliderProgress2 && (this.sliderProgress2.value = this.player?.currentTime!);
      this.sliderProgress2 && (this.sliderProgress2.max = this.player?.duration!);

      this.currentTimeElm &&
        (this.currentTimeElm.innerText = this.timeConvert(this.player!.currentTime!));

      applyFill(this.sliderProgress!);
      applyFill(this.sliderProgress2!);
    });

    this.sliderVolume?.addEventListener("mouseover", () => {
      applyFill(this.sliderVolume!);
    });

    this.sliderVolume?.addEventListener("mouseleave", () => {
      applyFill(this.sliderVolume!);
    });

    // this.player?.addEventListener("ended", handleNext);
  }

  removeEventListener() {
    this.player?.removeEventListener("timeupdate", () => null);
    this.sliderVolume?.removeEventListener("mouseover", () => null);
    // this.sliderProgress?.removeEventListener("mouseover", () => null);
    // this.sliderProgress?.removeEventListener("mouseleave", () => null);
    // console.log("removeEventListener");
  }
}

function applyFill(slider: any, option?: string) {
  const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);

  let isHover = slider.parentElement.querySelector(":hover");

  const bg = `linear-gradient(90deg, ${
    !isHover ? settings.fill : settings.fillOnHover
  } ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;

  slider.style.background = bg;
}

export default new Player();
