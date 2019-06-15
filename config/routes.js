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

function login(req, res) {
  // implement user login
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
