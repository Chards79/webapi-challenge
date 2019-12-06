const express = require('express');
const helmet = require('helmet');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const server = express();

server.use(helmet());
server.use(express.json());

// endpoints for Projects

// GET all projects
server.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
})
// GET project by id
server.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving the project' });
        })
})

// POST a new project
server.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error adding the project" });
        })
})

// PUT request to edit a project
server.put('/:id', (req, res) => {
    const edits = req.body;
    Projects.update(req.params.id, edits)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'The project could not be found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error updating the project' });
        })
})

// DELETE a project
server.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'Project successfully deleted', removed });
            } else {
                res.status(404).json({ message: 'The project with that ID does not exist' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The project could not be deleted' });
        })
})

// endpoints for Actions

// POST a new action
server.post('/:id/actions', (req, res) => {
    const id = req.params.project_id;
    const { description, notes } = req.body;

    if (!description || !notes) {
        res.status(400).json({ message: 'Please provide a description and notes for the action' })
    } else {
        Actions.insert(id, req.body)
            .then(action => {
                if (action) {
                    res.status(201).json({ message: 'The action was created', action })
                } else {
                    res.status(404).json({ message: 'The project with that ID does not exist' })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: 'There was an error while saving the action to the database' })
            })
    }
})




module.exports = server;