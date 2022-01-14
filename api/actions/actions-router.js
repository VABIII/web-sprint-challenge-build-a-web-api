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
            if(!action){
                res.status(404).json({
                    message: "Get action by id error"
                })
            } else {
                res.json(action)
            }
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const {project_id, notes, description} = req.body

    if(!project_id || !notes || !description) {
        res.status(400).json({
            message: "Something something something error"
        })
    } else {
        Actions.insert({project_id, notes, description})
            .then(newAction => {
                // console.log(newAction)
                // const project =  Projects.get(newAction.project_id)
                // if(!project) {
                //     res.status(404).json({
                //         message: "Action not found"
                //     })
                // } else {
                //     res.status(201).json()
                // }
                res.status(201).json(newAction)
            })
            .catch(next)
    }
})

router.put('/:id', (req, res, next) =>{
    const {project_id, notes, description, completed} = req.body
    const {id} = req.params

    if(!project_id || !notes || !description || !completed) {
        res.status(400).json({
            message: "New Action missing updated field"
        })
    } else {
        Actions.update(id, req.body)
            .then(({id}) => {
                console.log(id)
                return Actions.get(id)
            })
            .then(updatedAction => {
                res.json(updatedAction)
            })
            .catch(next)
    }
})

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.json()
        })
        .catch(next)
})




































module.exports = router

