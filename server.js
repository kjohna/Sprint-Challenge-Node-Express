const express = require('express');

const projectsRouter = require('./routers/projects-router');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h3>Server is setup!</h3>`);
});

module.exports = server;