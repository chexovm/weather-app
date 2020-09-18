import express from "express";
import cors from "cors";
import path from "path"
import bodyParser from "body-parser";
import fetch from "node-fetch";
let __dirname = path.resolve();
let PORT = process.env.PORT || "5000"

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
