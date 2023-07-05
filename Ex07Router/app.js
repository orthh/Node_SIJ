const express = require("express");
const app = express();
// user.js 모듈
const userRouter = require("./routes/user");
const boardRouter = require("./routes/board");

app.use("/user", userRouter); // localhost:8888/user
app.use("/board", boardRouter); // localhost:8888/board

app.set("port", process.env.PORT || 8888);
app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 포트에서 서버 연결 기다리는중 ...");
});
