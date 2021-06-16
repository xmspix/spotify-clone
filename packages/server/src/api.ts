import axios from "axios";

export type ApiClient = {
  getSearch: (query: string) => Promise<any>;
  getPlaylist: (video_id: string, playlist: string) => Promise<any>;
};

export const createApiClient = (): ApiClient => {
  return {
    getSearch: (query: string) =>
      axios
        .get(
          `https://www.youtube.com/results?search_query=${query}&sp=EgIQAw==`
        )
        .then((res) => res.data)
        .catch((error) => ({error:true, msg:error.msg})),

    getPlaylist: (video_id: string, playlist: string) =>
      axios
        .get(`https://www.youtube.com/watch?v=${video_id}&list=${playlist}`)
        .then((res) => res.data)
        .catch((error) => ({error:true, msg:error.msg})),
  };
};
