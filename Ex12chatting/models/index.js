const Sequelize = require("sequelize");
const Member = require("./member");
const Room = require("./room");
const Chat = require("./chat");

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
db.Room = Room;
db.Chat = Chat;

Member.init(sequelize); // 테이블 생성
Room.init(sequelize);
Chat.init(sequelize);

Member.associate(db); // 테이블 관계 설정
Room.associate(db);
Chat.associate(db);

module.exports = db;
