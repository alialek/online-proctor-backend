const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {User} = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//@route   Get api/auth
//@desc    Get user by ID
//@access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Проблема на сервере');
  }
});

//@route   POST api/auth
//@desc    Auth user
//@access  Public

router.post(
  '/',
  [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Проверка на уникальность пользователя
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Введены неверные данные' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Введены неверные данные' }]
        });
      }

      // Возвращаем JSONWebToken

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 999999999
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
          console.log(token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
