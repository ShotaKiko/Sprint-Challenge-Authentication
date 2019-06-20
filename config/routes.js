const axios = require('axios');
const bcrypt = require('bcryptjs')

const Helper = require('../database/helperFunctions.js')
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register (req, res) {
  let user = req.body
  try{
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const saved = await Helper.add(user)
    const token = Helper.generateToken(saved)
      res.status(201).json({ token }) ;
  } catch(error) {
      res.status(500).json(error);
    };
}

async function login(req, res) {
  let { username, password } = req.body
  try{
    const userAuthorized = await Helper.findBy ({ username })
    .first()
    if( username && bcrypt.compareSync(password, userAuthorized.password)) {
      const token = Helper.generateToken(userAuthorized)
      res.status(200).json({
        message: `Welcome ${userAuthorized.username}!`,
        authToken : token
      })
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch(error) {
      res.status(500).json(error);
    };
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
