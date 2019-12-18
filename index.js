const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['aks83hdgew']
  })
);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
      Your ID is ${req.session.userId}
      <form method="POST">
        <input name="email" style='display: block' placeholder="email" />        
        <input name="password" style='display: block' placeholder="password" />        
        <input name="passwordConfirmation" style='display: block' placeholder="password confirmation" />
        <button>Sign Up</button>        
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in Use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must be the same');
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send('Account Created');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

app.get('/signin', (req, res) => {
  res.send(`
    <div>
    <form method="POST">
      <input name="email" style='display: block' placeholder="email" />        
      <input name="password" style='display: block' placeholder="password" />        
      <button>Sign In</button>        
    </form>
  </div>
  `);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email Not Found');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send('Invalid Password');
  }

  req.session.userId = user.id;
  res.send('You are signed in!!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
