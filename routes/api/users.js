const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../models/User');
const config = require('config');
const auth = require('../../middleware/auth');

//@route   POST api/users
//@desc    Register
//@access  Public

router.post(
  '/',
  [
    check('name', 'Введите имя')
      .not()
      .isEmpty(),
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Пароль должен быть длиннее 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password, tabId, group } = req.body;
    email = email.toLowerCase();
    try {
      // Проверка на уникальность пользователя
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password, tabId, group
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Возвращаем JSONWebToken

      const payload = {
        user: {
          id: user.id
        }
      };
      
     
      let newUser = await User.findOne({ email });

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 999999999
        },
        (err, token) => {
          if (err) throw err;
          console.log(newUser);
          res.json({ token, user: newUser });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/quests', auth, async (req, res) => {
  const id = req.user.id;
  console.log(id);
  try {
    // Проверка на уникальность пользователя
    let user = await User.findOne({ _id: id });
    res.json(user.quests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
