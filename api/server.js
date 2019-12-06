const express = require('express');
const helmet = require('helmet');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    const message = process.env.MSG || "Hello Sprint";

    Projects.find()
        .then(projects => {
            res.status(200).json({ message, projects });
        })
        .catch(error => {
            console.error('\nERROR', error);
            res.status(500).json({ error: 'Cannot retrieve the projects' });
        });
});

server.get('/', (req, res) => {
    const messageTwo = process.env.MSG || "Hello Sprint";

    Actions.find()
        .then(actions => {
            res.status(200).json({ messageTwo, actions });
        })
        .catch(error => {
            console.error('\nERROR', error);
            res.status(500).json({ error: 'Cannot retrieve the actions' });
        });
});














module.exports = server;