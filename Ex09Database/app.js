const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const indexRouter = require("./routes"); // 그 후 경로가 index면 생략 가능

// views변수 만들기
// html 문서 경로, 형식
app.set("views", __dirname + "/views");
app.set("view engine", "html");

// nunjucks 설정
nunjucks.configure("views", {
  express: app, // app 객체 연결
  watch: true, // html파일이 연결되면 템플릿 인젠을 랜더링
});

app.use("/", indexRouter); // localhost:8888/...

app.set("port", process.env.PORT || 8888);
app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 포트에서 서버연결 기다리는 중 ...");
});
