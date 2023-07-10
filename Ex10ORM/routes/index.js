const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/insert", async (req, res, next) => {
  const { id, pw, age } = req.body;

  try {
    // insert
    // id: id, 컬럼 : value
    const result = await User.create({
      id,
      pw,
      age,
    });

    res.json(result.id);
  } catch (error) {
    next(err); // 에러처리 미들웨어
  }
});

router.get("/select", async (req, res, next) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/select/:id", async (req, res, next) => {
  const reqId = req.params.id;

  try {
    // sequelize 는 user객체 빌드해서 넣으면 안대네
    const result = await User.findOne({
      where: {
        id: reqId,
      },
      attributes: ["id", "age"],
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// UPDATE : 모두 업데이트
// PATCH : 일부 업데이트
router.patch("/update/:id", async (req, res, next) => {
  try {
    const result = await User.update(
      {
        pw: req.body.pw,
        age: req.body.age,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.json(result); // 성공시 1
  } catch (error) {
    next(error);
  }
});

// 강사님
// router.delete("/delete/:id", async (req, res, next) => {
//   try {
//     const result = await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.json(result); // 1
//   } catch (error) {
//     next(error);
//   }
// });

// 내가
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.destroy({
      where: {
        id,
      },
    });
    res.json(result); // 1
  } catch (error) {
    next(error);
  }
});

module.exports = router;
