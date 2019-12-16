const express = require('express');
const bodyParser = require('body-parser');
const cookiesession = require('cookie-session');

const authRouter = require('./routes/admin/auth');

// const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookiesession({
    keys: ['hdhfg65ekqewl4c7']
  })
);

app.use(authRouter);

app.listen(3000, () => {
  console.log(`Listening`);
});
