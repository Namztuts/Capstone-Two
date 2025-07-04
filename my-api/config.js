'use strict';

/** Shared config for app; can be required many places. */
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
   return process.env.NODE_ENV === 'test'
      ? 'postgresql://namztuts:password@localhost/a_and_e_test'
      : process.env.DATABASE_URL ||
           'postgresql://namztuts:password@localhost/a_and_e';
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

console.log('Jobly Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database:'.yellow, getDatabaseUri());
console.log('---');

module.exports = {
   SECRET_KEY,
   PORT,
   BCRYPT_WORK_FACTOR,
   getDatabaseUri,
};
