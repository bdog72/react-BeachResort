//
//
const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signUpTemplate = require('../../views/admin/auth/signup');
const signInTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post(
  '/signup',
  [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must be a valid email')
      .custom(async email => {
        const existingUser = await usersRepo.getOneBy({ email });
        if (existingUser) {
          throw new Error('Email in use');
        }
      }),
    check('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters'),
    check('passwordConfirmation')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters')
      .custom((passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
          throw new Error('Passwords must match');
        }
      })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    const { email, password, passwordConfirmation } = req.body;

    // create a user in our repo to represent this person
    const user = await usersRepo.create({ email: email, password: password });

    req.session.userId = user.id;

    res.send('Account Created');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signInTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email Not Found Bozo');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send('Invalid Password');
  }

  req.session.userId = user.id;

  res.send('You are signed In!!!!!');
});

module.exports = router;
