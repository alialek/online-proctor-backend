const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const isAuthor = require("../../middleware/isAuthor");
const { User } = require("../../models/User");
const { Test, Question } = require("../../models/Test");
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
      tries: req.body.tries,
      amount: req.body.amount,
      results: [],
      questions: [],
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

//@route   PUT api/test/id
//@desc    Обновление теста
//@access  Authenticated, isAdmin

router.put("/:id", isAdmin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let test = await Test.findOne({ _id: id });
    let user = await User.findById(req.user.id);
    if (user.test.find(test_id => test_id == id)) {
      (test.title = req.body.title),
        (test.description = req.body.description),
        (test.tries = req.body.tries),
        (test.amount = req.body.amount);
      const newTest = await test.save();
      let { title, description, tries, amount } = newTest;
      return res.json({ title, description, tries, amount });
    } else {
      return res.status(401).json({ status: "error", msg: "Нет прав" });
    }
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
      .select(["id", "title", "description"])
      .exec();
    console.log(test);
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

  try {
    let user = await User.findById(req.user.id);
    if (user.tests.indexOf(id) >= 0) {
      let test = await Test.findById(id);
      res.json(test);
    } else {
      res.status(401).json({ status: "error", message: "Нет прав" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Проблема на сервере");
  }
});

//@route   POST api/test/:id
//@desc    Save Questions
//@access  Author

router.post("/:id", isAuthor, async (req, res) => {
  let idTest = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let test = await Test.findById(idTest);
    console.log(test.questions)
    let questions = await Question.create(req.body);

    test.questions.push(...questions);
    const newTest = await test.save();

    res.json(newTest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//@route   PUT api/test/:id/:riddle
//@desc    Edit Question
//@access  Author

router.put("/:id/:riddle", isAuthor, async (req, res) => {
  let idTest = req.params.id;
  let idRiddle = req.params.riddle
  const errors = validationResult(req);
  let {title, description, answer, type, timeToSolve, imageUrl, videoUrl} = req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let question = await Question.findById(idRiddle)
    question = {
      title, description, answer, type, timeToSolve, imageUrl, videoUrl
    }

    question.title = 'Лол'
    let newQuestion = await question.save()

    let test = await Test.findById(id)
    let oldquests = test.questions.map(quest => {
      quest._id != question.id
    })
    test.questions.push(...oldquests, question);
    await test.save()
    // test.questions.push(...questions);
    // const newTest = await test.save();

    res.json(newQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//@route   Get api/test/:id_test/:id_question
//@desc    Get full riddle by ID
//@access  Private

router.put("/:id_test/:id_question", isAuthor, async (req, res) => {
  let id_test = parseInt(req.params.id_quest);
  let id_question = parseInt(req.params.id_riddle);
  //Получаем количество решенных загадок у пользователя в данном квесте
  try {
    let test = Test.findById(id_test).select("riddles");

    if (user) {
      let riddle = quest.riddles.filter(riddle => riddle.num == id_riddle)[0];
      //Перебор по решенным загадкам пользователя, собираем ID в массив
      let solved = userRiddles[0].riddles.map(riddle => {
        return riddle.id;
      });
      //Проверим, может, загадка уже решена, тогда принимаем любой ответ
      let alreadyAnswered = solved.filter(x => x == id_riddle);
      //Функция для сравнения, есть ли в solved все ID из riddle.requires
      let intersection = riddle.requires.filter(x => solved.includes(x));

      if (alreadyAnswered.length !== 0) {
        res.json(riddle);
      } else if (intersection.length == riddle.requires.length) {
        res.json(riddle);
      } else {
        res.json("Тебе сюда нельзя (пока что)");
      }
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Проблема на сервере");
  }
});

//@route   POST api/quest/:id
//@desc    Register user in game (just add quest to profile)
//@access  Authenticated (user)

router.post("/:id", auth, async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let quest = await Quest.findOne({ _id: id });

    let userID = req.user.id;
    let user = await User.findOne({ _id: userID });
    console.log(user);
    quests = {
      id: id,
      riddles: [
        {
          id: 0,
        },
      ],
    };
    quest.registered.push(userID);
    user.quests.push(quests);
    await user.save();
    quest.save().then(data => {
      console.log(data.registered);
    });
    res.json(user);
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
  let userRiddles = user.quests.filter(quest => quest.id === id_quest);

  let quest = await Quest.findOne({ _id: id_quest }).select("riddles");
  let riddle = quest.riddles.filter(riddle => riddle.num == id_riddle)[0];
  let riddleIsRequired = riddle.required;
  let solved = userRiddles[0].riddles.map(riddle => {
    return riddle.id;
  });
  //Проверим, может, загадка уже решена, тогда принимаем любой ответ
  let alreadyAnswered = solved.filter(x => x == id_riddle);
  //Функция для сравнения, есть ли в solved все ID из riddle.requires
  let intersection = riddle.requires.filter(x => solved.includes(x));
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
            function(err, docs) {
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
          function(err, docs) {
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
