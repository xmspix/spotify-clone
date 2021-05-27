import axios from "axios";

export type ApiClient = {
  getSearch: (query: string) => Promise<any>;
  getPlaylist: (video_id: string, playlist: string) => Promise<any>;
  // getAudio: (video_id: string) => Promise<any>;
};

export const createApiClient = (): ApiClient => {
  return {
    // `https://www.youtube.com/results?search_query=${query}&sp=QgIIAQ==`
    getSearch: (query: string) =>
      axios
        .get(
          `https://www.youtube.com/results?search_query=${query}+music&sp=EgIQAw==`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error)),

    getPlaylist: (video_id: string, playlist: string) =>
      axios
        .get(`https://www.youtube.com/watch?v=${video_id}&list=${playlist}`)
        .then((res) => res.data)
        .catch((error) => console.log(error)),

    // getAudio: (video_id: string) =>
    //   axios
    //     .get(
    //       `https://www.youtube.com/get_video_info?video_id=${video_id}&sts=17488&el=detailpage`
    //     )
    //     .then((res) => res.data)
    //     .catch((error) => console.log(error)),
  };
};
