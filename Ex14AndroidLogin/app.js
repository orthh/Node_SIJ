const express = require("express");
const app = express();
const MemberRouter = require("./routes/member");

// body 데이터 인코딩
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우터
app.use("/member", MemberRouter);

app.set("port", process.env.PORT || 8888);
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버 연결 기다리는 중 ...");
});
