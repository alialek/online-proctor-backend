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

//@route   Get api/quest/id
//@desc    One Quest by ID
//@access  Public

router.get('/:id', async (req, res) => {
  try {
    let quest = await Quest.findOne({ id }).exclude('riddles');
    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

//@route   Get api/quest/id?fields=riddles
//@desc    Riddle for Quest By ID
//@access  Public

router.get('/:id', async (req, res) => {
  try {
    let quest = await Quest.findOne({ id }).include('riddles');
    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

//@route   POST api/quest/
//@desc    NEW Quest
//@access  Authenticated (user)

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Text is qrequired')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
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
  }
);

module.exports = router;
