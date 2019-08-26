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
  let user = await User.findOne({ _id: userID });
  let userRiddles = user.quests.filter(quest => quest.id === id_quest);
  let quest = await Quest.findOne({ _id: id_quest });

  try {
    if (user.isAdmin || Date.now() > quest.dateStartInUTC) {
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
        res.json('Тебе сюда нельзя (пока что)');
      }
    } else {
      res.json({ success: false });
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

    let id_quest = parseInt(req.params.id_quest);
    let quest = await Quest.findOne({ _id: id_quest });

    let userID = req.user.id;
    let user = await User.findOne({ _id: userID });

    quests = {
      id: id,
      riddles: [
        {
          id: 0
        }
      ]
    };
    quest.registered.push(id);

    user.quests.push(quests);
    await user.save();
    await quest.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route   POST api/quest/:id_quest/:id_riddle
//@desc    POST an answer
//@access  Private
//@todo    Запилить проверку уровня, чтобы пользователь не мог отправлять post, если не решил загадку ранее DONE

router.post('/:id_quest/:id_riddle', auth, async (req, res) => {
  let id_quest = parseInt(req.params.id_quest);
  let id_riddle = parseInt(req.params.id_riddle);
  //Получаем количество решенных загадок у пользователя в данном квесте
  let userID = req.user.id;
  let user = await User.findOne({ _id: userID });
  let userRiddles = user.quests.filter(quest => quest.id === id_quest);

  let quest = await Quest.findOne({ _id: id_quest }).select('riddles');
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
      if (typeof userAnswer === 'string') {
        userAnswer = userAnswer.toLowerCase();
      }
      try {
        let riddleAnswer = riddle.answer;
        if (typeof riddleAnswer === 'string') {
          riddleAnswer = riddleAnswer.toLowerCase();
        }
        console.log(intersection.length, riddle.requires.length);
        if (
          riddleAnswer == userAnswer &&
          intersection.length == riddle.requires.length
        ) {
          riddle = {
            id: riddle.num
          };
          User.updateOne(
            { _id: userID, 'quests.id': id_quest },
            {
              $push: {
                'quests.$.riddles': riddle,
                'quests.$.lastAnswer': userAnswer
              }
            },
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
    } else {
      console.log('notRequired');
      try {
        riddle = {
          id: riddle.num
        };
        User.updateOne(
          { _id: userID, 'quests.id': id_quest },
          { $push: { 'quests.$.riddles': riddle } },
          function(err, docs) {
            res.json({ success: true });
          }
        );
      } catch (error) {
        console.error(err.message);
        res.status(500).json('Проблема на сервере');
      }
    }
  }
});

module.exports = router;
