const express = require("express");
const router = express.Router();
const Member = require("../models/member");

router.post("/login", async (req, res, next) => {
  const { id, pw } = req.body;

  try {
    const result = await Member.findOne({
      where: {
        id,
        pw,
      },
      attributes: ["id", "nick"],
    });
    if (result) {
      req.session.member = result;
      req.session.save(() => res.send("OK"));
    } else {
      res.send("정보불일치");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
