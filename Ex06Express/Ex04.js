const express = require("express");
const app = express();

// post요청 데이터 -> body 에 데이터가 있음
// -> body를 파싱
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Ex04form.html");
});

app.get("/get", (req, res) => {
  // QueryString : ?id=smhrd&pw=12345
  console.log(req.query); // 한 객체에 들어옴
  const { id, pw } = req.query;
  res.send("get 완료");
});

// a태그
// localhost:8888/login/smhrd/12345
app.get("/get/:id/:pw", (req, res) => {
  console.log(req.params);
  const { id, pw } = req.params;
  res.send("get2완료");
});

// post
app.post("/post", (req, res) => {
  console.log(req.body);
  const { id, pw } = req.body;
  res.send("post완료");
});

app.set("port", process.env.PORT || 8888);
app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 포트에서 서버연결 기다리는 중 ...");
});
