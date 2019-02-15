const express = require('express');

const projectsDb = require('../data/helpers/projectModel.js');

const router = express.Router();

// projects-router will respond to requests to '/api/projects' see server.js

// GET all posts
router.get('/', async(req, res) => {
  try {
    const projects = await projectsDb.get();
    res.status(200).json(projects);
    return;
  } catch {
    res.status(500).json({ error: "The projects could not be retrieved." });
  }
});

module.exports = router;