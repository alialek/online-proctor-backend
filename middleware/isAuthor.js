const jwt = require("jsonwebtoken");
const config = require("config");
const {User} = require("../models/User");

module.exports = async function(req, res, next) {
  const token = req.header("x-auth-token");
  console.log(req.params)

  if (!token) {
    res.status(401).json({ msg: "Нет токена" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    let user = await User.findOne({_id: decoded.user.id});
    req.user = user;
    if (user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ msg: "Отсутствуют права администратора" });
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Токен невалидный" });
  }
};
