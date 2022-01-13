// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectsRouter)

// require('dotenv').config()


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some code!</h2>`);
});

server.use((err, req, res, next) => { // eslint-disable-line
    console.log('disaster!')
    res.status(err.status || 500).json({
        message: `The Horror: ${err.message}`,
    })
})


module.exports = server;

























































