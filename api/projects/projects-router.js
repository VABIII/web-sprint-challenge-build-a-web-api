const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()

const { validateId, logger } = require('./projects-middleware')


router.get('/', logger, (req, res, next) =>{
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateId, logger, (req, res, next) => {
    const { id } = req.params

    Projects.get(id)
        .then(project => {
            // if(!project){
            //     res.status(404).json({
            //         message: "Stuff and stuff"
            //     })
            // } else {
                res.json(project)
            // }
        })
        .catch(next)
})

router.post('/', logger,(req, res, next) => {
    const { name, description } = req.body

    if(!name || !description) {
        res.status(400).json({
            message: "Missing name or body fields"
        })
    }
    else {
        Projects.insert(req.body)
            .then(newProject => {
                res.status(201).json(newProject)
            })
            .catch(next)
    }
})

router.put('/:id', validateId, logger, (req, res, next) => {
    const { id } = req.params
    const {name, description, completed} = req.body

    if(!name || !description || completed === undefined) {
        res.status(400).json({
            message: "Missing name or body fields"
        })
    }
    else {
        Projects.update(id, {name, description, completed})
            .then(updatedPost => {
                console.log(updatedPost)
                res.json(updatedPost)
            })
            .catch(next)
    }
})

router.delete('/:id', validateId, logger, (req, res, next) =>{
    const { id } = req.params

    Projects.remove(id)
        .then(deleted => {
            if(!deleted){
                res.status(404).json({
                    message: "Deleted error stuff"
                })
            } else {
                res.json(deleted)
            }
        })
        .catch(next)
})

router.get('/:id/actions', validateId, logger, (req, res, next) => {
    const {id} = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

module.exports = router












































