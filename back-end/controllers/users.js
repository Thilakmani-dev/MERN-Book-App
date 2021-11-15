const generateToken = require('../utils/generateToken');
const User = require('../models/user.model');

const registerUser = async (req, res) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.sendStatus(400);
    throw new Error('User Already exists');
  }

  const newUser = new User({
    email,
    fullName,
    password,
  });

  newUser.save(function (err, obj) {
    if (err) res.send(err);

    res.json({
      ...obj,
      token: generateToken(obj._id),
    });
  });
  // .then((user) => {
  //   res.json({
  //     message: 'User Added!',
  //     data: {
  //       ...user,
  //       token: generateToken(user._id),
  //     },
  //   });
  // })
  // .catch((err) => res.sendStatus(400).json('Error ' + err));
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      user,
      token: generateToken(user._id),
    });
  } else {
    const error = new Error('Invalid or Wrong Password');
    await res.status(400).send(error);
  }
};

module.exports = { registerUser, authUser };
