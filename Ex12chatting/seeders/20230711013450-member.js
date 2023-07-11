"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "member",
      [
        {
          id: "dkdleldpdy",
          pw: "qlalfqjsgh",
          nick: "slrspdla",
        },
        {
          id: "smhrd",
          pw: "12345",
          nick: "ekfr",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // 전체 초기화
    await queryInterface.bulkDelete("member", null, {});
  },
};
