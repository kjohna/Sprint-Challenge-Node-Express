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

// GET post by ID
router.get('/:id', async(req, res) => {
  try {
    const project = await projectsDb.get(req.params.id);
    console.log("project: ", project);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "No project with that id was found." });
    }
  } catch {
    res.status(500).json({ error: "The project could not be retrieved." });
  }
});

module.exports = router;