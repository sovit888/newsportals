const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/post", require("./routes/postroute"));
app.use("/comments", require("./routes/commentroute"));
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT);
