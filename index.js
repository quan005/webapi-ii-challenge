require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`\n*** Server Running on ${port} ***\n`);
});