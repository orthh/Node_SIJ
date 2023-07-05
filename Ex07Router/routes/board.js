const express = require("express");
const boardRouter = express.Router();

boardRouter.get("/test", (req, res) => {
  res.send("board 요청!");
});

module.exports = boardRouter;
