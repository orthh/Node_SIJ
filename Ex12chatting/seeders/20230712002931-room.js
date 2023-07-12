"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "room",
      [
        {
          roomid: "room1",
          title: "풀스택채팅방1",
          owner: "member1",
        },
        {
          roomid: "room2",
          title: "빅데이터채팅방",
          owner: "member2",
        },
        {
          roomid: "room3",
          title: "데이터디자인채팅방",
          owner: "member3",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("room", null, {});
  },
};
