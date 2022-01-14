const express = require('express')

const Actions = require('./actions-model')

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








































module.exports = router

