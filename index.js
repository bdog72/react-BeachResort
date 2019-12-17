const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" style='display: block' placeholder="email" />        
        <input name="password" style='display: block' placeholder="password" />        
        <input name="passwordConfirmation" style='display: block' placeholder="password confirmation" />
        <button>Sign Up</button>        
      </form>
    </div>
  `);
});

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in Use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must be the same');
  }

  res.send('Account Created');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
