const express = require('express')
const Joi = require('joi')
const app = express()
app.use(express.json())
const hostname = 'localhost'

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/courses', (req, res) => {
    res.send(courses)
})

app.get('/courses/:id', (req, res) => {
    // res.setHeader('Content-Type', 'application/json')
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('404 not found !')
    else res.send(course)
})

app.post('/courses', (req, res) => {
    const { error } = validateCourse(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course)
    res.send(courses) 
})

app.put('/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('404 not found !')

    const { error } = validateCourse(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    courses.name = req.body.name
    res.send(course)
})

app.delete('/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('404 not found !')
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(`Course id = ${course.id} deleted.`)
})

const port = process.env.PORT || 3000
app.listen(port, hostname, () =>
    console.log(`Server running at http://${hostname}:${port}/`)
)

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })

    return schema.validate(course)
}
