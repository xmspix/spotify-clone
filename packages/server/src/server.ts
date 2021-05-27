import express from "express";
let bodyParser = require("body-parser");

const port = 3232;

const app = express();

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`🚀  Server ready at http://localhost:${port}`);
});
