import cheerio from "cheerio";
import fs from "fs";

export const crawl = (htmlContent: any) => {
  const $ = cheerio.load(htmlContent);
  let data: any = $("script:contains('ytInitialData')")[0];
  data = data.children[0].data;
  data = data.match(/var ytInitialData = (.*);/)[1];
  data = JSON.parse(data);
  return data;
};

export const changeText = (text: string) =>
  text
    .normalize("NFKD")
    .replace(/[^\w\/]'/g, "")
    .match(/[a-zA-Z0-9-()]+/gi)!
    .join(" ");

export const saveFile = (path: string, data: any) => {
  if (process.env.NODE_ENV === "development") {
    fs.writeFileSync(path, JSON.stringify(data));
  }
};
