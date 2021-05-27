import { createApiClient } from "../api";
import { crawl } from "./helpers";
import ytdl from "ytdl-core";
import ytsr from "ytsr";

import querystring from "querystring";

const api = createApiClient();

export const getPlaylist = async (search_query: string) => {
  const data = await ytsr(search_query);
  const filter = data.items.filter((itm: any) => itm.isLive === false);
  const promises = await Promise.all(
    filter.map(async (itm: any) => {
      itm.src = await getInfo(itm.id);
      return itm;
    })
  );
  return promises;
};

export const getInfo = async (id: string) => {
  const data = await ytdl.getInfo(id);
  return data.formats.filter(
    (itm: any) => itm.hasVideo === true && itm.hasAudio === true
  )[0];
};

export const getPlaylists = async (search_query: string) => {
  const searchString = querystring.escape(search_query);

  const htmlContent = await api.getSearch(searchString.replace(/ /gi, "+"));

  const data = crawl(htmlContent);

  if (data.contents) {
    let contents =
      data.contents.twoColumnSearchResultsRenderer.primaryContents
        .sectionListRenderer.contents[0].itemSectionRenderer.contents;
    contents = contents.filter((e: any) => e.playlistRenderer);

    return contents.map((playlist: any) => {
      playlist = playlist.playlistRenderer;
      const _newData = {
        pid: playlist.playlistId,
        videoCount: playlist.videoCount,
        title: playlist.title.simpleText,
        artist: playlist.longBylineText.runs[0].text,
        id: playlist.videos[0].childVideoRenderer.videoId,
        artwork: playlist.thumbnails[0].thumbnails[0].url.split("?")[0],
        ownerBadges:
          playlist.ownerBadges &&
          playlist.ownerBadges.map((e: any) => e.metadataBadgeRenderer.tooltip),
      };
      return _newData;
    });
  } else {
    return [];
  }
};

export const getPlaylistByID = async (playlist: string, id: string) => {
  const htmlContent = await api.getPlaylist(id, playlist);

  const data = crawl(htmlContent);

  let contents =
    data.contents.twoColumnWatchNextResults.playlist.playlist.contents.filter(
      (e: any) =>
        e.playlistPanelVideoRenderer &&
        !e.playlistPanelVideoRenderer.unplayableText
    );

  const playlistData = {
    title: data.contents.twoColumnWatchNextResults.playlist.title,
    count: data.contents.twoColumnWatchNextResults.playlist.totalVideos,
    artwork: `https://i.ytimg.com/vi/${contents[0].playlistPanelVideoRenderer.videoId}/hqdefault.jpg`,
  };

  const _data = contents.map((playlist: any) => {
    playlist = playlist.playlistPanelVideoRenderer;
    const _newData = {
      id: playlist.videoId,
      title: playlist.title.simpleText ? playlist.title.simpleText : "",
      duration: playlist.lengthText ? playlist.lengthText.simpleText : "",
      artwork: playlist.thumbnail.thumbnails[0].url.split("?")[0],
      artist: playlist.longBylineText.runs[0].text,
    };
    return _newData;
  });

  return _data;
};
