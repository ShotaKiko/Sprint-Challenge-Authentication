const db = require('./dbConfig.js');
const jwt = require('jsonwebtoken');

module.exports = {
  add,
  find,
  findBy,
  findById,
  generateToken,
};

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
    };
  
    const options = {
      expiresIn: '1h',
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
