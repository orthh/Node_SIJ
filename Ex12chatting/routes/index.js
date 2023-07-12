const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// 첫페이지(login.html)
router.get("/", (req, res) => {
  res.render("login");
});

// rooms.html (db에서 채팅방 데이터 불러오기)
router.get("/rooms", async (req, res, next) => {
  // room 테이블에 있는 모든 데이터
  // console 에 출력
  try {
    const rooms = await Room.findAll();
    res.render("rooms", {
      rooms,
    });
    // res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
