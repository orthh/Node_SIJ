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
  const { id, pw, tel, birth } = JSON.parse(req.body.AndMember);

  let sql = "Insert into andmember values (?, ?, ?, ?)";
  conn.query(sql, [id, pw, tel, birth], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("Fail");
    } else {
      // 오류 발생x
      console.log(rows);
      if (rows.affectedRows > 0) res.send("Success");
      else res.send("Fail");
    }
  });
});

// 로그인
router.post("/login", (req, res) => {
  console.log(req.body.loginAmv);
  // json 그자체로 들어오므로 jsonObject로 바꿔야함
  const { id, pw } = JSON.parse(req.body.loginAmv);

  let sql = "select * from andmember where id=? and pw = ?";
  conn.query(sql, [id, pw], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send("Fail");
    } else {
      // 오류 발생x
      console.log(rows);
      if (rows.length > 0) {
        // 로그인 성공
        res.json(rows[0]);
      } else res.send("Fail");
    }
  });
});

module.exports = router;
