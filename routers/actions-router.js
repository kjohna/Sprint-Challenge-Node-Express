const express = require('express');

const actionsDb = require('../data/helpers/actionModel.js');

const router = express.Router();

// actions-router will respond to requests to '/api/actions' see server.js

// GET all actions
router.get('/', async(req, res) => {
  try {
    const actions = await actionsDb.get();
    res.status(200).json(actions);
    return;
  } catch {
    res.status(500).json({ error: "The actions could not be retrieved." });
  }
});

// GET action by ID
router.get('/:id', async(req, res) => {
  try {
    const action = await actionsDb.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "No action with that id was found." });
    }
  } catch {
    res.status(500).json({ error: "The action could not be retrieved." });
  }
});

// POST action
router.post('/', async(req, res) => {
  try {
    const actionData = req.body;
    if (!actionData.project_id || !actionData.description || !actionData.notes) {
      res.status(400).json({ error: "Action's project_id, description, and notes are required to make a new action."});
    } else {
      newProj = await actionsDb.insert(actionData);
      res.status(200).json({ success: true, message: newProj });
    }
  } catch {
    res.status(500).json({ error: "Failed to save action." });
  }
});

// DELETE action
router.delete('/:id', async(req, res) => {
  try {
    const numDeleted = await actionsDb.remove(req.params.id);
    if (numDeleted < 1) {
      res.status(404).json({ message: "Could not find an action with that id."});
    } else {
      res.status(200).json({ message: "Successfully deleted action" });
    }
  } catch {
    res.status(500).json({ error: "The action could not be deleted." });
  }
});

// PUT to action by id
router.put('/:id', async(req, res) => {
  try {
    const changes = req.body;
    if (!changes.project_id || !changes.description || !changes.notes) {
      res.status(400).json({ error: "Must provide action's project_id, description, and notes to update." });
    } else {
      const updatedAction = await actionsDb.update(req.params.id, changes);
      if (!updatedAction) {
        res.status(404).json({ error: "No action was found with that id" });
      } else {
        res.status(200).json({ message: "Successful update.", action: updatedAction });
      }
    }
  } catch {
    res.status(500).json({ error: "The action could not be updated." });
  }
});

module.exports = router;