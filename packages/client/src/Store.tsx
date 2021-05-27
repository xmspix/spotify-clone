import React from "react";

interface IState {
  menu: string;
  search: string;
  playlist: any[];
  playlistData: any[];
  mediaPlaying: {} | boolean;
  isPlaying: boolean;
  like: any[];
  setupPlayer: {};
  video: boolean;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState = {
  menu: "Home",
  search: "",
  playlist: [],
  playlistData: [],
  mediaPlaying: false,
  isPlaying: false,
  like: [],
  setupPlayer: {},
  video: false,
};

// declare global {
//   interface Array<T> {
//     remove(elem: T): Array<T>;
//   }
// }

// if (!Array.prototype.remove) {
//   Array.prototype.remove = function<T>(this: T[], elem: T): T[] {
//     return this.filter(e => e !== elem);
//   }
// }

declare global {
  interface Array<T> {
    pushUnique(arr: any[], item: {}): any[];
  }
}

Array.prototype.pushUnique = function <T>(arr: any[], item: {}): any[] {
  arr.push(item);
  return arr.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "SET_MENU":
      return { ...state, menu: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_PLAYLIST":
      return { ...state, playlist: action.payload };
    case "SET_PLAYLIST_DATA":
      return { ...state, playlistData: action.payload };
    case "SET_MEDIA":
      return { ...state, mediaPlaying: action.payload };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "ADD_LIKE":
      return {
        ...state,
        like: state.like.pushUnique(state.like, action.payload),
      };
    // return { ...state, favorite: state.favorite.concat(action.payload) };
    case "REMOVE_LIKE":
      return {
        ...state,
        like: state.like.filter((f) => f.id !== action.payload.id),
      };
    case "SETUP_PLAYER":
      return { ...state, setupPlayer: action.payload };
    case "SET_VIDEO":
      return { ...state, video: action.payload };
    default:
      return state;
  }
}

export function StoreProvider({ children }: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
