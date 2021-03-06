const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.DEV_DATA_BASE = 'mongodb://localhost:27017/moviesdb';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.ORIGINS = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://susliksmovies.nomoredomains.monster',
  'https://susliksmovies.nomoredomains.monster',
];
