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
  let stop = req.query.stop;
  let test = await Test.findById(id);

  try {
    if (stop) {
      test.isActive = false;
      try {
        for (let i = 0; i < req.app.wssUsers[id].length; i++) {
          req.app.wssUsers[id][i].send(JSON.stringify({ type: "stop" }));
        }
        delete req.app.wssUsers[id];
      } catch {}
      await test.save();
      res
        .status(200)
        .json({ status: "success", message: "Сессия остановлена" });
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

router.get("/:id_test/:id_question", isAdmin, async (req, res) => {
  let id_question = req.params.id_question;

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
  console.log("Отправка нового вопроса");
  let idTest = req.params.id;
  let test = await Test.findById(idTest);
  if (req.query.stop) {
    test.isActive = false;

    let saved = await test.save();
    res.json(saved);
  } else {
    try {
      let questions = await Question.create({
        question: req.body.question,
        answers: [],
        until: test.timeToAnswer,
        deadline:
          Math.floor(Date.now() / 1000) + parseInt(test.timeToAnswer) + 5,
      });
      if (!req.app.wssUsers[idTest]) {
        return res.status(500).send("Еще нет пользователей");
      } else {
        test.questions.push(questions);
      }

      for (let i = 0; i < req.app.wssUsers[idTest].length; i++) {
        req.app.wssUsers[idTest][i].send(
          JSON.stringify({
            id: questions._id,
            type: "question",
            question: questions.question,
            until: parseInt(questions.until) + 5,
          }),
        );
      }

      await test.save();

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
  let { id, mark } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    console.log(id);
    let answer = await Answer.findById(id);
    let test = await Test.findById(idTest);

    answer.mark = mark;
    let result = await answer.save();
    let index = test.participants.findIndex(
      (obj) => obj.userId == result.userId,
    );
    if (index >= 0) {
      let aIndex = test.participants[index].answers.findIndex(
        (obj) => obj._id.toString() == result.id.toString(),
      );
      test.participants[index].answers[aIndex].mark = result.mark;
      await test.save();
      res.json({ result });
    } else {
      res.status(404).json({ status: "error", message: "Участник не найден" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   POST api/test/:id/:question
//@desc    Отправить ответ
//@access  Auth user

router.post("/answer/:id/:question", auth, async (req, res) => {
  let idTest = req.params.id;
  let questionId = req.params.question;
  let userName = await User.findById(req.user.id).select("name");
  let { answer } = req.body;
  try {
    let test = await Test.findById(idTest);
    let question = await Question.findById(questionId);
    if (parseInt(question.deadline) > Math.floor(Date.now() / 1000)) {
      let newAnswer = await Answer.create({
        answer,
        questionId,
        question: question.question,
        userName: userName.name,
        userId: req.user.id,
        mark: 0,
      });

      let index = test.participants.findIndex(
        (obj) => obj.userId == req.user.id,
      );
      console.log("Находим индекс участника", index);
      if (index >= 0) {
        test.participants[index].answers.push(newAnswer);
        let check = await test.save();
        question.answers.push(newAnswer);
        await question.save();
        res.status(200).json({ status: "success", message: "Ответ сохранен" });
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Вы не зарегистрированы в тесте" });
      }
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
  console.log(req.params);
  try {
    let test = await Test.findOne({ _id: req.params.id });
    let user = await User.findById(req.user.id);
    console.log("check for test");
    let newParticipant = {
      userName: user.name,  
      userId: req.user.id,
      answers: [],
    };
    let isParticipantRegistered =
      test.participants.length == 0
        ? -1
        : test.participants.findIndex((obj) => obj.userId == req.user.id);
    if (isParticipantRegistered == -1) {
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
            isActive: test.isActive,
          },
        });
      });
    } else {
      res.status(200).json({
        status: "found",
        message: "Вы уже были зарегистрированы ранее",
        test: {
          title: test.title,
          description: test.description,
          timeToAnswer: test.timeToAnswer,
          id: test._id,
          isActive: test.isActive,
        },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
