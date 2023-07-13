const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

router.get("/:roomid", async (req, res, next) => {
  const { roomid } = req.params;
  try {
    const chats = await Chat.findAll({
      where: {
        roomid,
      },
    });
    res.render("chat", {
      roomid,
      userid: req.session.member.id,
      chats,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:roomid/insert", async (req, res, next) => {
  const { roomid } = req.params;
  const { chat } = req.body;
  const userid = req.session.member.id;
  try {
    // DB 데이터 삽입 -> 다른 클라이언트 화면 보이지 XXX
    const result = await Chat.create({
      roomid,
      chat,
      userid,
    });

    // socket 사용 -> 이 채팅을 입력한 클라이언트와 같은 룸에 있는 모든 클라이언트에게
    //               실시간으로 데이터 뿌려주기
    req.app.get("io").of("/chat").to(roomid).emit("chat", { userid, chat });
    res.send("OK");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
