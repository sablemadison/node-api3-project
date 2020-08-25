const express = require('express');

const server = express();

const usersRouter = require('./users/userRouter');

// parse incoming objects
server.use(express.json());


server.use('/api/users', logger, usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}


module.exports = server;
