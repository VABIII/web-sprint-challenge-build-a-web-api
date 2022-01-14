const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

const validateActionId = (req, res, next) => {
    Actions.get(req.params.id)
        .then(id => {
            if(!id) {
                next({status: 404, message: "Something"})
            } else {
                next()
            }
        })
        .catch(next)
}

const validateProjectId = (req, res, next) => {
    const id = req.body.project_id

    Projects.get(id)
        .then(project => {
            if(!project) {
                next(res.status(404).json({
                    message: "Project does not exist"
                }))
            } else {
                next()
            }

        })
        .catch(next)
}

module.exports = {
    validateActionId,
    validateProjectId
}











































