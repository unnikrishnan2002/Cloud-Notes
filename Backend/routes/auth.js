const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = process.env.SECRET;

// Route:1 Create a user using : Post "/api/auth/createuser". No login
router.post('/createuser', [

  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {

  let success = false;
  // If there are errors return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  // check whether the user with the same email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry ! A user with the same email exists already" })
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })

    //   .then(user => res.json(user))
    //     .catch(err=> console.log(err))
    // res.json({error: 'Please enter a unique value'})

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }

})

// Route:2 Aunthenticate a user using POST 
router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], async (req, res) => {

  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success, error: "Please use valid credintials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "wrong password" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken});

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Route:3 Get loggedin user details using POST . Login required
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
});

module.exports = router