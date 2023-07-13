const express = require("express");
const indexRouter = require("./routes");
const memberRouter = require("./routes/memberRouter");
const chatRouter = require("./routes/chat");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
const webSocket = require("./socket");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const app = express();

// form 파일받기
app.use(express.urlencoded({ extended: true }));
// postman
app.use(express.json());
// body-parser (안써도 댈듯 express상위버전)
// app.use(bodyParser.json());

// 쿠키,세션설정
app.use(
  session({
    httpOnly: true, // http 통신 할때만 허용
    secret: "secretkey", // 암호화 키설정
    resave: false, // 세션에 수정사항이 없더라도 다시 저장할것인지
    cookie: {
      // 쿠키 설정
      httpOnly: true,
    },
    store: new fileStore(),
  })
);
// force : false -> 기존 테이블은 건들지 않음
sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log("DB 연결 성공!");
  })
  .catch((err) => {
    console.error(err);
  });

// 정적리소스 경로 지정(css,js(front-end), ..)
app.use(express.static(__dirname + "/public"));

// nunjuks 설정
app.set("views", __dirname + "/views");
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 라우터 설정
app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/chat", chatRouter);

// 포트 설정
app.set("port", process.env.PORT || 8888);
const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버연결 기다리는 중 ...");
});

webSocket(server, app);
