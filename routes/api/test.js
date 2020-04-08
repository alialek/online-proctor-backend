const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const isAuthor = require("../../middleware/isAuthor");
const { User } = require("../../models/User");
const { Test, Question, Answer } = require("../../models/Test");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route   POST api/test/
//@desc    Создание теста
//@access  Authenticated, isAdmin

router.post("/", isAdmin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newTest = new Test({
      title: req.body.title,
      description: req.body.description,
      timeToAnswer: req.body.timeToAnswer,
      createdBy: req.user.id,
      questions: [],
      participants: [],
    });
    const test = await newTest.save();

    let user = await User.findById(req.user.id);
    user.tests.push(test.id);
    await user.save();

    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   Get api/test
//@desc    Получить все тесты, созданные пользователем
//@access  Public

router.get("/", isAdmin, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let test = await Test.find()
      .where("_id")
      .in(user.tests)
      .select(["id", "title", "description", "isActive"])
      .exec();
    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Проблема на сервере");
  }
});

//@route   Get api/test/id
//@desc    Получить инфу о тесте
//@access  Администратор, владелец теста

router.get("/:id", isAuthor, async (req, res) => {
  let id = req.params.id;
  let stop = req.query.id;
  let test = await Test.findById(id);
  try {
    if (stop) {
      test.isActive = false;
      res.json(await test.save());
    } else {
      let user = await User.findById(req.user.id);
      if (user.tests.indexOf(id) >= 0) {
        res.json(test);
      } else {
        res.status(401).json({ status: "error", message: "Нет прав" });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Проблема на сервере");
  }
});

//@route   Get api/test/:id_test/:id_question
//@desc    Посмотреть ответы на определенный вопрос
//@access  Автор

router.get("/:id_test/:id_question", isAuthor, async (req, res) => {
  let id_question = req.params.id_question

  try {
    let question = await Question.findById(id_question);
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Проблема на сервере");
  }
});

//@route   POST api/test/:id
//@desc    Отправка нового вопроса
//@access  Автор

router.post("/:id", isAuthor, async (req, res) => {
  let idTest = req.params.id;
  let test = await Test.findById(idTest);
  if (req.query.stop) {
    test.isActive = false;
    for (var key in req.app.wssUsers[idTest]) {
      req.app.wssUsers[idTest][key].send(JSON.stringify({ type: "stop" }));
    }
    delete req.app.wssUsers[idTest];
    let saved = await test.save();
    res.json(saved);
  } else {
    try {
      let questions = await Question.create({
        question: req.body.question,
        answers: [],
        until: Math.floor(Date.now() / 1000) + test.timeToAnswer + 5,
      });

      test.questions.push(questions);
      for (var key in req.app.wssUsers[idTest]) {
        req.app.wssUsers[idTest][key].send(
          JSON.stringify({
            id: questions._id,
            type: "question",
            question: questions.question,
            until: questions.until - 5,
          }),
        );
      }

      await test.save()

      res.json(questions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
});

//@route   PUT api/test/:id/:question
//@desc    Поставить оценку
//@access  Auth user

router.put("/:id/:question", isAuthor, async (req, res) => {
  let idTest = req.params.id;
  let idQuestion = req.params.question;
  const errors = validationResult(req);
  let { answer } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let answer = await Answer.findById(req.body.id);
    answer.mark = req.body.mark;
    let result = await answer.save();

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   PUT api/test/:id/:question
//@desc    Отправить ответ
//@access  Auth user

router.put("/:id/:question", auth, async (req, res) => {
  let idTest = req.params.id;
  let questionId = req.params.question;
  const errors = validationResult(req);
  let { answer } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let question = await Question.findById(questionId);
    if (question.until > Math.floor(Date.now() / 1000)) {
      let newAnswer = await Answer.create({
        answer,
        questionId,
        userName: req.user.name,
        userId: req.user.id,
        mark: 0,
      });

      req.wss.send();

      await question.answer.push(newAnswer);
      res.status(200).json({ status: "success", message: "Ответ сохранен" });
    } else {
      res
        .status(300)
        .json({ status: "failed", message: "Время ответа истекло" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   POST api/test/register/:id
//@desc    Добавить пользователя в тест
//@access  Authenticated (user)

router.post("/register/:id", auth, async (req, res) => {
  try {
    let test = await Test.findOne({ _id: req.params.id });
    let user = await User.findOne({ _id: req.user.id });
    console.log("check for test");
    let newParticipant = {
      userId: req.user.id,
      answers: [],
    };
    let isParticipantRegistered = test.participants.filter(
      (participant) => participant.id == req.user.id,
    );
    if (isParticipantRegistered.length == 0) {
      test.participants.push(newParticipant);
      test.save().then((data) => {
        res.status(200).json({
          status: "success",
          message: "Вы успешно добавлены в тест",
          test: {
            title: data.title,
            description: data.description,
            timeToAnswer: data.timeToAnswer,
            id: data._id,
          },
        });
      });
    } else {
      res.status(302).json({
        status: "found",
        message: "Вы уже были зарегистрированы ранее",
        test: {
          title: test.title,
          description: test.description,
          timeToAnswer: test.timeToAnswer,
          id: test._id,
        },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   POST api/quest/:id_quest/:id_riddle
//@desc    POST an answer
//@access  Private
//@todo    Запилить проверку уровня, чтобы пользователь не мог отправлять post, если не решил загадку ранее DONE

router.post("/:id_quest/:id_riddle", auth, async (req, res) => {
  let id_quest = parseInt(req.params.id_quest);
  let id_riddle = parseInt(req.params.id_riddle);
  //Получаем количество решенных загадок у пользователя в данном квесте
  let userID = req.user.id;
  let user = await User.findOne({ _id: userID });
  let userRiddles = user.quests.filter((quest) => quest.id === id_quest);

  let quest = await Quest.findOne({ _id: id_quest }).select("riddles");
  let riddle = quest.riddles.filter((riddle) => riddle.num == id_riddle)[0];
  let riddleIsRequired = riddle.required;
  let solved = userRiddles[0].riddles.map((riddle) => {
    return riddle.id;
  });
  //Проверим, может, загадка уже решена, тогда принимаем любой ответ
  let alreadyAnswered = solved.filter((x) => x == id_riddle);
  //Функция для сравнения, есть ли в solved все ID из riddle.requires
  let intersection = riddle.requires.filter((x) => solved.includes(x));
  //Уже отвечено?
  if (alreadyAnswered.length !== 0) {
    return res.json({ success: true });
  } else {
    if (riddleIsRequired) {
      let userAnswer = req.body.answer;
      if (typeof userAnswer === "string") {
        userAnswer = userAnswer.toLowerCase();
      }
      try {
        let riddleAnswer = riddle.answer;
        if (typeof riddleAnswer === "string") {
          riddleAnswer = riddleAnswer.toLowerCase();
        }
        console.log(intersection.length, riddle.requires.length);
        if (
          riddleAnswer == userAnswer &&
          intersection.length == riddle.requires.length
        ) {
          riddle = {
            id: riddle.num,
          };
          User.updateOne(
            { _id: userID, "quests.id": id_quest },
            {
              $push: {
                "quests.$.riddles": riddle,
                "quests.$.lastAnswer": userAnswer,
              },
            },
            function (err, docs) {
              res.json({ success: true });
            },
          );
        } else {
          res.json({ success: false });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).json("Проблема на сервере");
      }
    } else {
      console.log("notRequired");
      try {
        riddle = {
          id: riddle.num,
        };
        User.updateOne(
          { _id: userID, "quests.id": id_quest },
          { $push: { "quests.$.riddles": riddle } },
          function (err, docs) {
            res.json({ success: true });
          },
        );
      } catch (error) {
        console.error(err.message);
        res.status(500).json("Проблема на сервере");
      }
    }
  }
});

module.exports = router;

// //@route   PUT api/test/id
// //@desc    Обновление теста
// //@access  Authenticated, isAdmin

// router.put("/:id", isAdmin, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     let test = await Test.findOne({ _id: id });
//     let user = await User.findById(req.user.id);
//     if (user.test.find(test_id => test_id == id)) {
//       (test.title = req.body.title),
//         (test.description = req.body.description),
//         (test.tries = req.body.tries),
//         (test.amount = req.body.amount);
//       const newTest = await test.save();
//       let { title, description, tries, amount } = newTest;
//       return res.json({ title, description, tries, amount });
//     } else {
//       return res.status(401).json({ status: "error", msg: "Нет прав" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });
