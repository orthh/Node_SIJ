const express = require("express");
const db = require("../config/database");
const router = express.Router();

const conn = db.init(); // 연결 객체생성, 반환
db.connect(conn);

// member 테이블 전체 정보 가져오기
router.get("/select", (req, res) => {
  // 템플릿엔진 : html 양식(템플릿) + 데이터 -> 결과 문서(nunjucks)
  //              => 가지고 온 데이터를 활용해서 화면 렌더링

  let sql = `
    SELECT *
      FROM MEMBER
  `;

  // 콜백함수에서 결과처리(err-오류, rows-select결과(데이터)
  //                     , fields - 결과외의 메타데이터)
  conn.query(sql, (err, rows, fields) => {
    // console.log(err);
    // console.log(rows);
    // console.log(fields);
    // key,value 보내기
    res.render("index", {
      list: rows,
    });
  });
});

// 한 회원 검색
router.get("/select/:id", (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM MEMBER WHERE id = ?";

  conn.query(sql, [id], (err, rows, fields) => {
    console.log(rows);

    // json 형태로 데이터를 응답
    res.json({ member: rows });
  });
});

// 회원 추가
router.post("/insert", (req, res) => {
  // 사용자가 입력한 id, pw, nick(POST -> BODY)
  //  -> body parsing 할 수 있도록 설정(app.js)
  const { id, pw, nick } = req.body;

  let sql = "insert into member values (?, ?, ?)";

  conn.query(sql, [id, pw, nick], (err, rows, fields) => {
    console.log(rows);

    // /select로 다시 요청하게 만들기! (redirect)
    res.redirect("/select");
  });
});

// 회원정보 수정(패스워드, 닉네임)
router.post("/update", (req, res) => {
  const { id, pw, nick } = req.body;
  let sql = "update member set pw = ? , nick = ? WHERE id = ?";

  conn.query(sql, [pw, nick, id], (err, rows, fields) => {
    console.log(rows);
    res.redirect("/select");
  });
});

// 회원정보 삭제(id)
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;

  let sql = "delete from member where id = ?";

  conn.query(sql, [id], (err, rows, fields) => {
    console.log(rows);
    res.redirect("/select");
  });
});

module.exports = router;
