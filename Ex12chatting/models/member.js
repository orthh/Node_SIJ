const Sequelize = require("sequelize");

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    // init : 테이블 정의(컬럼, 자료형..., 테이블 자체 설정)
    // associate : 테이블 관계
    return super.init(
      {
        // 컬럼 관련 속성
        id: {
          type: Sequelize.STRING(50),
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        pw: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        // 테이블 관련 설정
        sequelize,
        timestamps: false,
        modelName: "Member",
        tableName: "member",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // 테이블 관계설정
  }
};
