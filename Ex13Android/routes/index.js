const express = require("express");
const db = require("../config/database");
const router = express.Router();

// mysql DB 사용
const conn = db.init(); // 연결 객체생성, 반환
db.connect(conn);

// 회원가입
// http://172.30.1.22:8888/join
// 안드로이드와 로컬호스트통신 안됨.
router.post("/join", (req, res) => {
  console.log(req.body.AndMember);
  // json 그자체로 들어오므로 jsonObject로 바꿔야함
  const andMember = JSON.parse(req.body.AndMember);
  console.log(andMember);
  const { id, pw, tel, birth } = andMember;
  console.log(id, pw, tel, birth);
  res.send("OK");
});

module.exports = router;
