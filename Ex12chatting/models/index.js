const Sequelize = require("sequelize");
const Member = require("../models/member");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  // -> app{model, sequelize - db연결정보}
};

db.sequelize = sequelize;
db.Member = Member;
// db.Chat = Chat

Member.init(sequelize); // 테이블 생성
Member.associate(db); // 테이블 관계 설정

module.exports = db;
