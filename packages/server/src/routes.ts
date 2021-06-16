import { Router } from "express";
import fs from "fs";
import path from "path";

import { getInfo, getPlaylists, getPlaylistByID } from "./utils/youtube";

const app = Router();

app.get("/api/categories", async (req, res) => {
  const file = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./categories.json"), "utf8")
  );
  const basePath = "assets/";
  const data = file.map((e: any) => ({
    title: e.title,
    artwork: process.env.HOST + basePath + e.artwork,
  }));

  res.send(data);
});

app.get("/api/getAudio/:id", async (req, res) => {
  const id: string = decodeURI(req.params.id.toString());
  const audio = await getInfo(id);
  res.send(audio);
});

app.get("/api/search/:query", async (req, res) => {
  const search = decodeURI(req.params.query+"official audio");
  const playlists = await getPlaylists(search);
  res.send(playlists);
});

app.get("/api/playlist/:pid/:id", async (req, res) => {
  const playlists = await getPlaylistByID(req.params.pid, req.params.id);
  res.send(playlists);
});

module.exports = app;
