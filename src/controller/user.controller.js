const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const jwtSecret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5ODUyNDIyMCwiaWF0IjoxNjk4NTI0MjIwfQ.opQ384cBYoT_i6WIJpQ-OwLoscvYlnO8M5U1jIwSz-Q";

//to create a new user in db
function create(req, res) {
  const uniqueId = uuid.v4();
  const userdata = {
    id: uniqueId,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    password: req.body.password,
  };
  User.create(userdata)
    .then((data) => {
      const token = jwt.sign({ userId: data.id }, jwtSecret, {
        expiresIn: "1h",
      });

      return res.send({
        msg: "Registration Success",
        userdata: userdata,
        token: token,
      });
    })
    .catch((err) => {
      console.warn(err);
    });
}

// to get all users
function getAllUsers(req, res) {
  User.findAll()
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      console.warn(err);
      return res.status(500).send({ msg: "Error retrieving users" });
    });
}

//to get individual user
function getUser(req, res) {
  let userID = req.params.id;
  User.findOne({ where: { id: userID } })
    .then((user) => {
      if (!user)
        return res.status(400).json({ msg: "No user found with that ID." });
      else return res.json(user);
    })
    .catch((err) => console.log(err));
}

//to update user details
async function updateUser(req, res) {
  try {
    const { username, phone, role } = req.body;
    const user = await User.update(
      { username, phone, role },
      { where: { id: req.params.id } }
    );
    if (user[0] == 0) return res.status(400).json("No change in user data.");
    else {
      const updatedUser = await User.findOne({ where: { id: req.params.id } });
      res.json(updatedUser);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
}

//to delete user
function deleteUser(req, res) {
  let userId = req.params.id;
  User.destroy({ where: { id: userId } })
    .then(() => {
      res.json({ msg: "Deleted Successfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
}

//Login user
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the username and password are provided
    if (!username || !password) {
      return res.status(400).json({ msg: "Please provide both username and password." });
    }

    // Find the user in the database based on the username
    const user = await User.findOne({ where: { username: username } });

    // If no user found with that username
    if (!user) {
      return res.status(400).json({ msg: "Invalid username or password." });
    }

    // Check if the provided password matches the stored password for the user
    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid username or password." });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

    // Send the token and user data in the response
    res.json({
      msg: "Login Successful",
      token: token,
      userdata: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
}

//To get current user
function getCurrentUser(req, res) {
  res.json(req.user)
}


module.exports = {
  create,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  getCurrentUser
};
