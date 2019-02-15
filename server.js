const express = require('express');

const projectsRouter = require('./routers/projects-router');
const actionsRouter = require('./routers/actions-router');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h3>Server is setup!</h3>`);
});

module.exports = server;