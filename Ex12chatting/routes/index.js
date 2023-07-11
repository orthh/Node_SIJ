const express = require("express");
const router = express.Router();

// 첫페이지(login.html)
router.get("/", (req, res) => {
  res.render("login"); // login.html 렌더링
});

module.exports = router;
