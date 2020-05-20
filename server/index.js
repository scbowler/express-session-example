const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(session({
  secret: 'This should be in another file',
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/api/user', (req, res) => {
  let username = null;

  if(req.session.user) {
    username = req.session.user;
  }

  res.send({ username });
});

app.post('/api/user', (req, res) => {
  const { username } = req.body;

  req.session.user = username;

  res.send({ username });
});

app.get('/api/count', (req, res) => {
  if(!req.session.user) {
    return res.status(401).send({ error: 'Not Authorized' });
  }

  const count = req.session.count || 0;

  res.send({ count });
});

app.post('/api/count/:type', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send();
  }

  let count = req.session.count || 0;

  if(req.params.type === 'add') {
    count++;
  } else {
    count--;
  }

  req.session.count = count;

  res.send({ count });
});

app.get('/api/sign-out', (req, res) => {
  delete req.session.user;
  delete req.session.count;

  res.send();
});

app.listen(PORT, () => {
  console.log('Server listening on PORT:', PORT);
});
