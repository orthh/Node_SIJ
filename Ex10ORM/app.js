const express = require("express");
const { sequelize } = require("./models"); // => models/index
const indexRouter = require("./routes"); // => routes/index
const bodyParser = require("body-parser");
const app = express();

// body 데이터 가져올 때 추가
app.use(express.urlencoded({ extended: true }));
// json 데이터
app.use(express.json()); // express 4.16.0 부터는 bodyParser안깔아도댐
// app.use(bodyParser.json());

// force : true -> 테이블이 존재할 경우 삭제 / false : 기본 테이블 건들지 않음
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", indexRouter);

app.set("port", process.env.PORT || 8888);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버연결 기다리는 중 ...");
});
