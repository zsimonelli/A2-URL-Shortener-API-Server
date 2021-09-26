const express = require("express");
const app = express();
const port = 5000;

// array of objects of format [{long: x, short: y}]
let mappings = [];

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// creates short token and appends object to mappings array
app.post("/shorten/:lurl", async (req, res) => {
  const lurl = req.params.lurl;
  const surl = (Math.random() + 1).toString(36).substring(7);

  if (!mappings.find(({ long }) => long === lurl)) {
    //   if(!validUrl.isUri(lurl)) {
    //       return res.status(401).json('Invalid input URL')
    //   }
    mappings.push({ long: lurl, short: surl });
  }

  let index = mappings
    .map(function (e) {
      return e.long;
    })
    .indexOf(lurl);
  res.status(200).json({ index: index });
});

// returns the short value for indexed long url
app.get("/results/:id", (req, res) => {
  const index = req.params.id;

  res.send(mappings[index].short);
});

// redirects to webpage given a short url
app.get("/api/:surl", async (req, res) => {
  const surl = req.params.surl;

  let data = mappings.find((obj) => obj.short === surl);
  res.redirect("https://" + data.long);
});

// returns the JSON object mapping given a long or short url
app.get("/mapping/:url", (req, res) => {
  const url = req.params.url;
  res.json(mappings.find((obj) => obj.long === url || obj.short === url));
});

// returns all mapped elements
app.get("/mappings", (req, res) => {
  res.send(mappings);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
