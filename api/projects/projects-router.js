const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()



router.get('/', (req, res, next) =>{
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)

})

router.get('/:id', (req, res, next) => {

    Projects.get(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(next)

})

router.post('/', (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)

})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const changes = req.body
    Projects.update(id, changes)
        .then(projectUpdated => {
            res.json(projectUpdated)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) =>{
    const { id } = req.params

    Projects.remove(id)
        .then(deleted => {
            res.json(deleted)
        })
        .catch(next)

})



router.get('/:id/actions', (req, res, next) => {
    const {id} = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})
























module.exports = router





















