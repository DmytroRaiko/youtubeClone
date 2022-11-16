const User = require('../models/User');
const bcrypt = require('bcryptjs');
const handleError = require('../error');
const jwt = require('jsonwebtoken');
const { jwt: jwtSecret} = require('../config');

module.exports = {
  signUp: async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password });

    await newUser.save().catch(err => { throw handleError(404, err)});

    res.status(200).send({ message: "User has been created" });
  },

  signIn: async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) throw handleError(404, "User not found");

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) throw handleError(400, "Wrong credentials!");

    const token = jwt.sign({ id: user._id }, jwtSecret);
    const { password: pU, ...dataUser } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(dataUser);
  },

  google: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(req.body);


    if (user) {
      const token = jwt.sign({ id: user._id }, jwtSecret);
      const { password: pU, ...dataUser } = user._doc;

      return res.cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(dataUser);
    }

    const newUser = new User({
      ...req.body,
      fromGoogle: true,
    });

    const createdUser = await newUser.save().catch(err => { throw handleError(404, err)});
    console.log(createdUser);
    const token = jwt.sign({ id: createdUser._id }, jwtSecret);
    const { password: pU, ...dataUser } = createdUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(dataUser);
  }
};
