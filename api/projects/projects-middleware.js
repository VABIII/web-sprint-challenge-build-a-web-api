// add middlewares here related to projects
const Projects = require('./projects-model')


async function validateProjectBody(req, res, next) {
    const {name, description, completed} = req.body
    console.log(req.body)

    if(name || description || completed) {
        next()
    } else {
       next({status: 400, message: "Error"})
    }

}








module.exports = validateProjectBody



































