import { Router } from "express";
import fs from "fs";
import path from "path";

import { getPlaylist, getInfo, getPlaylists, getPlaylistByID } from "./utils/youtube";
import { saveFile } from "./utils/helpers";

const app = Router();

app.get("/api/categories", async (req, res) => {
  const file = JSON.parse(fs.readFileSync(path.join(__dirname, "./categories.json"), "utf8"));
  const basePath = "assets/";
  const data = file.map((e: any) => ({
    title: e.title,
    artwork: process.env.HOST + basePath + e.artwork,
  }));

  res.send(data);
});

// app.get("/api/search/:query", async (req, res) => {
//   console.log(decodeURI(req.params.query));

//   const search_query: string = decodeURI(req.params.query);
//   const searchResults = await getPlaylist(search_query);
//   fs.writeFileSync("./src/docs/youtube-search.json", JSON.stringify(searchResults));
//   res.send(searchResults);
// });

app.get("/api/getAudio/:id", async (req, res) => {
  const id: string = decodeURI(req.params.id.toString());
  const audio = await getInfo(id);
  saveFile("./src/docs/youtube-audio.json", audio);
  // fs.writeFileSync("./src/docs/youtube-audio.json", JSON.stringify(audio));
  res.send(audio);
});

app.get("/api/search/:query", async (req, res) => {
  const search = decodeURI(req.params.query);
  const playlists = await getPlaylists(search);
  saveFile("./src/docs/youtube-search-playlists.json", playlists);
  // fs.writeFileSync("./src/docs/youtube-search-playlists.json", JSON.stringify(playlists));
  res.send(playlists);
});

app.get("/api/playlist/:pid/:id", async (req, res) => {
  const playlists = await getPlaylistByID(req.params.pid, req.params.id);
  saveFile("./src/docs/youtube-playlist.json", playlists);
  // fs.writeFileSync("./src/docs/youtube-playlist.json", JSON.stringify(playlists));
  res.send(playlists);
});

/* TESTING */
app.get("/test/mysearch/:query", async (req, res) => {
  const data: any = JSON.parse(fs.readFileSync("./src/docs/youtube-search-playlists.json", "utf8"));
  res.send(data);
});

app.get("/test/playlist/:pid/:id", async (req, res) => {
  const data: any = JSON.parse(fs.readFileSync("./src/docs/youtube-playlist.json", "utf8"));
  res.send(data);
});

app.get("/test/getAudio/:id", async (req, res) => {
  const data: any = JSON.parse(fs.readFileSync("./src/docs/youtube-audio.json", "utf8"));
  res.json(data);
});

module.exports = app;
