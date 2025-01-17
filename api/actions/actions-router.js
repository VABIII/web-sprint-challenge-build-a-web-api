const express = require('express')

const Actions = require('./actions-model')

const {validateActionId, validateProjectId} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
                res.json(action)
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
                res.status(201).json(newAction)
            })
            .catch(next)
    }
})

router.put('/:id', validateActionId, validateProjectId, (req, res, next) =>{
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

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.json()
        })
        .catch(next)
})

module.exports = router




































