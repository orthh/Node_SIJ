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

router.get("/select/:id", (req, res) => {
  const { id } = req.params;
  let sql = `
    SELECT *
      FROM MEMBER
     WHERE ID = ${id}
  `;
  conn.query(sql, (err, rows, fields) => {
    res.render("index", {
      list: rows,
    });
  });
});

module.exports = router;
