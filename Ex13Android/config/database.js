// mysql2 : promises 사용이 가능한 형태
const mysql = require("mysql2");

const db_info = {
  host: "localhost",
  port: "3306",
  user: "fullstack",
  password: "12345",
  database: "boot",
};

// db 연결 -> 함수 (초기화, 연결)
module.exports = {
  // 작성한 db 연결정보로 연결(connection) 객체 생성, 반환
  init: () => mysql.createConnection(db_info), // 연결 객체 생성, 리턴
  // mysql 서버 연결, conn => 연결 객체
  connect: (conn) => {
    conn.connect((err) => {
      if (err) console.log("연결 실패!" + err);
      else console.log("연결 성공!");
    });
  },
};
