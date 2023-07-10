const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const indexRouter = require("./routes");
const webSocket = require("./socket");

app.set("views", __dirname + "/views");
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use("/", indexRouter);

app.set("port", process.env.PORT || 8888);

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버연결 기다리는중");
});

webSocket(server);
