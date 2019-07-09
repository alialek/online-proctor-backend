const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Menu = require('../../models/Menu');
const Syrup = require('../../models/Syrup');
const Spice = require('../../models/Spice');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route   Get api/menu
//@desc    All menu
//@access  Public

router.get('/', async (req, res) => {
  try {
    res.json(Menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

router.get('/syrups', async (req, res) => {
  try {
    res.json(Syrup);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

router.get('/spices', async (req, res) => {
  try {
    res.json(Spice);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is qrequired')
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
      const newMenuItem = new Menu({
        title: req.body.title,
        description: req.body.description,
        menuType: req.body.menuType,
        isnew: req.body.isnew,
        image: req.body.image},
        {$push: {variations: {
            size: req.body.variation.size,
            price: req.body.variation.price,
        }}}]
      });

      const menu = await newMenuItem.save();

      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
