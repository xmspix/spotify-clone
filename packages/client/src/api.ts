import axios from "axios";

type ApiClient = {
  getSearch: (query: string) => Promise<any>;
  getPlaylist: (pid: string, id: string) => Promise<any>;
  getAudio: (id: string) => Promise<any>;
  // getCategories: () => Promise<any>;
};

export const createApiClient = (): ApiClient => {
  return {
    getSearch: (query: string) =>
      axios
        .get(`http://localhost:3232/api/search/${query}`)
        .then((res) => res.data)
        .catch((error) => console.log(error)),

    getPlaylist: (pid: string, id: string) =>
      axios
        .get(`http://localhost:3232/api/playlist/${pid}/${id}`)
        .then((res) => res.data)
        .catch((error) => console.log(error)),

    getAudio: (id: string) =>
      axios
        .get(`http://localhost:3232/api/getAudio/${id}`)
        .then((res) => res.data)
        .catch((error) => console.log(error)),

    // getCategories: () => require("./categories.json"),
    // getCategories: () =>
    //   axios
    //     .get("/api/categories")
    //     .then((res) => res.data)
    //     .catch((error) => console.log(error)),
  };
};

export const category = [
  { title: "LoFi", artwork: require("./assets/categories/LoFi.jpg").default },
  {
    title: "Podcasts",
    artwork: require("./assets/categories/Podcasts.jpg").default,
  },
  {
    title: "Made For You",
    artwork: require("./assets/categories/Made_For_You.jpg").default,
  },
  {
    title: "Charts",
    artwork: require("./assets/categories/Charts.jpg").default,
  },
  {
    title: "New Releases",
    artwork: require("./assets/categories/New_Releases.jpg").default,
  },
  {
    title: "Discover",
    artwork: require("./assets/categories/Discover.jpg").default,
  },
  {
    title: "Concerts",
    artwork: require("./assets/categories/Concerts.jpg").default,
  },
  {
    title: "2020 Wrapped",
    artwork: require("./assets/categories/2020_Wrapped.jpg").default,
  },
  { title: "Mood", artwork: require("./assets/categories/Mood.jpg").default },
  { title: "Pop", artwork: require("./assets/categories/Pop.jpg").default },
  { title: "Chill", artwork: require("./assets/categories/Chill.jpg").default },
  { title: "Party", artwork: require("./assets/categories/Party.jpg").default },
  {
    title: "Hip Hop",
    artwork: require("./assets/categories/Hip_Hop.jpg").default,
  },
  { title: "Focus", artwork: require("./assets/categories/Focus.jpg").default },
  {
    title: "League of Legends",
    artwork: require("./assets/categories/League_of_Legends.jpg").default,
  },
  { title: "Rock", artwork: require("./assets/categories/Rock.jpg").default },
  {
    title: "Alternative",
    artwork: require("./assets/categories/blank.jpg").default,
  },
  { title: "Indie", artwork: require("./assets/categories/Indie.jpg").default },
  {
    title: "Dance / Electronic",
    artwork: require("./assets/categories/Dance_Electronic.jpg").default,
  },
  {
    title: "Wellness",
    artwork: require("./assets/categories/Wellness.jpg").default,
  },
  { title: "Sleep", artwork: require("./assets/categories/Sleep.jpg").default },
  {
    title: "Tastemakers",
    artwork: require("./assets/categories/Tastemakers.jpg").default,
  },
  {
    title: "Decades",
    artwork: require("./assets/categories/Decades.jpg").default,
  },
  {
    title: "Workout",
    artwork: require("./assets/categories/Workout.jpg").default,
  },
  {
    title: "At Home",
    artwork: require("./assets/categories/At_Home.jpg").default,
  },
  {
    title: "Travel",
    artwork: require("./assets/categories/Travel.jpg").default,
  },
  {
    title: "Folk & Acoustic",
    artwork: require("./assets/categories/Folk_Acoustic.jpg").default,
  },
  { title: "R&B", artwork: require("./assets/categories/R_B.jpg").default },
  { title: "Soul", artwork: require("./assets/categories/Soul.jpg").default },
  { title: "Jazz", artwork: require("./assets/categories/Jazz.jpg").default },
  { title: "Punk", artwork: require("./assets/categories/Punk.jpg").default },
  { title: "Metal", artwork: require("./assets/categories/Metal.jpg").default },
  { title: "Latin", artwork: require("./assets/categories/Latin.jpg").default },
  {
    title: "Classical",
    artwork: require("./assets/categories/Classical.jpg").default,
  },
  {
    title: "Caribbean",
    artwork: require("./assets/categories/Caribbean.jpg").default,
  },
  {
    title: "Gaming",
    artwork: require("./assets/categories/Gaming.jpg").default,
  },
  { title: "Blues", artwork: require("./assets/categories/Blues.jpg").default },
  { title: "Funk", artwork: require("./assets/categories/Funk.jpg").default },
  {
    title: "Trending",
    artwork: require("./assets/categories/Trending.jpg").default,
  },
  {
    title: "Kids & Family",
    artwork: require("./assets/categories/Kids_Family.jpg").default,
  },
  {
    title: "Country",
    artwork: require("./assets/categories/Country.jpg").default,
  },
  {
    title: "Flamenco",
    artwork: require("./assets/categories/blank.jpg").default,
  },
  {
    title: "Instrumental",
    artwork: require("./assets/categories/Instrumental.jpg").default,
  },
  {
    title: "Songwriters",
    artwork: require("./assets/categories/blank.jpg").default,
  },
];
