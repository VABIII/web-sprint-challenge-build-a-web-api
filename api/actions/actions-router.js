const express = require('express')

const Actions = require('./actions-model')
const Projects = require("../projects/projects-router")

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)

})

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            res.json(action)
        })
        .catch(next)

})

router.post('/', (req, res, next) => {
    const projectId = req.body.project_id


    Actions.insert(req.body)
        .then(newAction => {
            const project =  Projects.get(projectId)
            if(!project) {

                res.status(400).json({
                    message: "Something something something error"
                })
            } else {
                res.json(newAction)
            }
        })
        .catch(next)


})






































module.exports = router

