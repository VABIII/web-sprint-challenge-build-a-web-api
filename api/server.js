const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router')

const actionsRouter = require('./actions/actions-router')

server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some code!</h2>`);
});

server.use('*', (req, res, next) => {
    res.status(404).json({
        message: `${req.baseUrl} could not be found`
    })
})

server.use((err, req, res, next) => { // eslint-disable-line
    console.log('disaster!')
    res.status(err.status || 500).json({
        message: `The Horror: ${err.message}`,
        banana: err.banana
    })
})

module.exports = server;

























































