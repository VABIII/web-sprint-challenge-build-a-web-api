const express = require('express')

const Projects = require('./projects-model')



const router = express.Router()

router.get('/', (req, res, next) =>{
    Projects.get(req.params.id)
        .then(projects => {
            res.json(projects)
        })
        .catch(next)

})

router.get('/:id', (req, res, next) => {
    const {id} = req.params

    Projects.getProjectActions(id)
        .then(actions => {
            res.json(actions)
        })
        .catch(next)


})
























module.exports = router





















