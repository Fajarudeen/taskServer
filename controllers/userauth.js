const UserAuth = require("../models/userauth");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, phonenumber, password } = req.body;

  if (!username || !phonenumber || !password) {
    return res.status(400).json({
      success: false,
      message: { error: "please provide the user details" },
    });
  }

  const user = await UserAuth.findOne({ username });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "user alredy exists in DB",
    });
  }

  await UserAuth.create(req.body);

  res.status(200).json({
    success: true,
    message: "User registerd successfully ",
  });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("req.body",req.body);
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "please enter phonenumber and password",
      });
    }

    const user = await UserAuth.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "phone number not registerd",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password not correct",
      });
    } else {
      const token = jwt.sign({ id: user._id }, "1234");
      console.log(token);
      res.status(200).json({
        success: true,
        user,
        token,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Err",
    });
  }
};
