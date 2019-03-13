require('dotenv').config({
  path: __dirname + '/../.env'
});

describe('Ursmiles APIs', () => {
  // require('./app');
  require('./web');
  require('./general');
});
