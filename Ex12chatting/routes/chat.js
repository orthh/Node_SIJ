const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

router.get("/:roomid", async (req, res) => {
  const { roomid } = req.params;
  try {
    const chat = await Chat.findAll({
      where: {
        roomid,
      },
    });
    console.log(chat);
    res.render("chat", {
      roomid,
      chat,
    });
  } catch (err) {}
});

router.post("/:roomid/insert", async (req, res, next) => {
  const { roomid } = req.params;
  const { chat } = req.body;
  const userid = req.session.member.id;
  try {
    const result = await Chat.create({
      roomid,
      chat,
      userid,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
