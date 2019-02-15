const express = require('express');

const projectsDb = require('../data/helpers/projectModel.js');

const router = express.Router();

// projects-router will respond to requests to '/api/projects' see server.js

// GET all projects
router.get('/', async(req, res) => {
  try {
    const projects = await projectsDb.get();
    res.status(200).json(projects);
    return;
  } catch {
    res.status(500).json({ error: "The projects could not be retrieved." });
  }
});

// GET project by ID
router.get('/:id', async(req, res) => {
  try {
    const project = await projectsDb.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "No project with that id was found." });
    }
  } catch {
    res.status(500).json({ error: "The project could not be retrieved." });
  }
});

// GET project's actions by project ID
router.get('/:id/actions', async(req, res) => {
  try {
    const projectActions = await projectsDb.getProjectActions(req.params.id);
    if (projectActions.length > 0) {
      res.status(200).json(projectActions);
    } else {
      res.status(404).json({ message: "No actions for the project with that id were found." });
    }
  } catch {
    res.status(500).json({ error: "The project's actions could not be retrieved." });
  }
});

// POST project
router.post('/', async(req, res) => {
  try {
    const projectData = req.body;
    if (!projectData.name || !projectData.description) {
      res.status(400).json({ error: "Project name and description are required to make a new project."});
    } else {
      newProj = await projectsDb.insert(projectData);
      res.status(200).json({ success: true, message: newProj });
    }
  } catch {
    res.status(500).json({ error: "Failed to save project." });
  }
});

// DELETE project
router.delete('/:id', async(req, res) => {
  try {
    const numDeleted = await projectsDb.remove(req.params.id);
    if (numDeleted < 1) {
      res.status(404).json({ message: "Could not find a project with that id."});
    } else {
      res.status(200).json({ message: "Successfully deleted project" });
    }
  } catch {
    res.status(500).json({ error: "The project could not be deleted." });
  }
});

// PUT to project by id
router.put('/:id', async(req, res) => {
  try {
    const changes = req.body;
    if (!changes.name || !changes.description) {
      res.status(400).json({ error: "Must provide name and description to update." });
    } else {
      const updatedProj = await projectsDb.update(req.params.id, changes);
      if (!updatedProj) {
        res.status(404).json({ error: "No project was found with that id" });
      } else {
        res.status(200).json({ message: "Successful update.", project: updatedProj });
      }
    }
  } catch {
    res.status(500).json({ error: "The project could not be updated." });
  }
})

module.exports = router;