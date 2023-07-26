const express = require("express");
const db = require("../config/database");
const router = express.Router();

// mysql DB 사용
const conn = db.init(); // 연결 객체생성, 반환
db.connect(conn);

// 로그인
router.post("/login", (req, res) => {
  console.log(req.body.AndMember);
  // json 그자체로 들어오므로 jsonObject로 바꿔야함
  const { id, pw } = JSON.parse(req.body.AndMember);

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
