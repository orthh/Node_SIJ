const Sequelize = require("sequelize");

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    // init : 테이블 정의(컬럼, 자료형..., 테이블 자체 설정)
    // associate : 테이블 관계
    return super.init(
      {
        // 컬럼 관련 속성
        chatid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique: true,
          autoIncrement: true,
        },
        roomid: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        chat: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        chatdt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // 테이블 관련 설정
        sequelize,
        timestamps: false,
        modelName: "Chat",
        tableName: "chat",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // 테이블 관계설정
    // member(id) --- chat(user)
    // 1:N 관계
    // chat은 N 이므로 belongsTo 붙임
    // 1:N 일떄 N에서 1로 갈떄는 belongsTo 로 감
    db.Chat.belongsTo(db.Member, {
      foreignKey: "userid",
      targetId: "id",
    });
  }
};
