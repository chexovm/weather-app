import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.post("/api/", jsonParser, async function (req, res) {
  let findWoeid = await fetch(
    `https://www.metaweather.com/api/location/search/?lattlong=${req.body.latitude},${req.body.longitude}`
  );
  let woeidFetchResult = await findWoeid.json();

  let woeid = woeidFetchResult[0].woeid;
  let forecastFetch = await fetch(
    `https://www.metaweather.com/api/location/${woeid}`
  );
  let forecastResult = await forecastFetch.json();
  res.json(forecastResult);
});

app.listen(process.env.PORT || "5000", () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
