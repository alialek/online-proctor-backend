const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Quest = require('../../models/Quest');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route   Get api/quest
//@desc    All Quests
//@access  Public

router.get('/', async (req, res) => {
  try {
    let quest = await Quest.find().select('-riddles');
    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

//@route   Get api/quest/id && fields=riddles
//@desc    One Quest by ID
//@access  Private

router.get('/:id', auth, async (req, res) => {
  let id = parseInt(req.params.id);
  let fields = [];
  fields = req.query.fields;
  try {
    if (fields === 'riddles') {
      let quest = await Quest.findOne({ _id: id }).select('riddles');
      let riddles = quest.riddles.map(riddle => {
        return { title: riddle.title, type: riddle.type, num: riddle.num };
      });
      res.json(riddles);
    } else {
      let quest = await Quest.findOne({ _id: id }).select('-riddles');

      res.json(quest);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

//@route   Get api/quest/:id_quest/:id_riddle
//@desc    Get full riddle by ID
//@access  Private

router.get('/:id_quest/:id_riddle', auth, async (req, res) => {
  let id_quest = parseInt(req.params.id_quest);
  let id_riddle = parseInt(req.params.id_riddle);
  //Получаем количество решенных загадок у пользователя в данном квесте
  let userID = req.user.id;
  let user = await User.findOne({ _id: userID }).select('quests');
  let userRiddles = user.quests.filter(quest => quest.id === id_quest)[0];
  try {
    /*
    id Загадки - это ее номер по порядку. Если длина массива меньше  или равна номеру загадки, то пользователь может посмотреть ее условие, если запрошенный номер больше доступных пользователю, то возникает ошибка 
    */
    if (userRiddles.riddles.length >= id_riddle) {
      let quest = await Quest.findOne({ _id: id_quest }).select('riddles');
      let riddle = quest.riddles.filter(riddle => riddle.num == id_riddle);

      res.json(riddle);
    } else {
      res.json('Тебе сюда нельзя (пока что)');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

//@route   POST api/quest/
//@desc    NEW Quest
//@access  Authenticated (user)

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newQuest = new Quest({
      title: req.body.title,
      description: req.body.description,
      tags: {
        typeTeam: req.body.tags.typeTeam,
        typeGenre: req.body.tags.typeGenre,
        typeTime: req.body.tags.typeTime,
        location: req.body.tags.location
      },
      dateStart: req.body.dateStart,
      isActual: req.body.isActual,
      image: req.body.image,
      price: req.body.price,
      available: req.body.available,
      rules: req.body.rules,
      riddles: req.body.riddles
    });

    const quest = await newQuest.save();

    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route   POST api/quest/:id
//@desc    Register user in game (just add quest to profile)
//@access  Authenticated (user)

router.post('/:id', auth, async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let quest = await Quest.findOne({ _id: id }).select('riddles');

    let userID = req.user.id;
    let user = await User.findOne({ _id: userID });

    quests = {
      id: id,
      riddles: [
        {
          id: quest.riddles[0].num
        }
      ]
    };
    user.quests.push(quests);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route   POST api/quest/:id_quest/:id_riddle
//@desc    POST an answer
//@access  Private
//@todo    Запилить проверку уровня, чтобы пользователь не мог отправлять post, если не решил загадку ранее

router.post('/:id_quest/:id_riddle', auth, async (req, res) => {
  let id_quest = parseInt(req.params.id_quest);
  let id_riddle = parseInt(req.params.id_riddle);
  //Получаем количество решенных загадок у пользователя в данном квесте
  let userID = req.user.id;
  let user = await User.findOne({ _id: userID });
  let userRiddles = user.quests.filter(quest => quest.id === id_quest)[0];

  let userAnswer = req.body.answer;
  console.log(req);
  if (!isNaN(userAnswer)) {
    userAnswer = userAnswer.toLowerCase();
  }
  try {
    let quest = await Quest.findOne({ _id: id_quest }).select('riddles');
    let riddle = quest.riddles.filter(riddle => riddle.num == id_riddle);
    let riddleAnswer = riddle[0].answer;

    if (riddleAnswer == userAnswer) {
      riddle = {
        id: id_riddle + 1
      };
      User.updateOne(
        { _id: userID, 'quests.id': id_quest },
        { $push: { 'quests.$.riddles': riddle } },
        function(err, docs) {
          res.json({ success: true });
        }
      );
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

module.exports = router;
