// add middlewares here related to projects
const Projects = require('./projects-model')

const validateId = (req, res, next) => {
    Projects.get(req.params.id)
        .then(id => {
            if(!id) {
                next({status: 404, message: "Something"})
            } else {
                next()
            }
        })
        .catch(next)
}

const logger = (req, res, next) => {
    console.log(`[${req.method}]  ${req.url} ${new Date()}`)
    next()
}








module.exports = {
    validateId,
    logger
}


































