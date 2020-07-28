const User = require('../models/user')

async function create(req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        age: req.body.age,
    })

    // Save User in the database
    try {
        const result = await User.create(user)
        return res.json(result)
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while creating the User.',
        })
    }
}

// Retrieve all User from the database.
async function findAll(req, res) {
    try {
        const result = await User.getAll()
        return res.json(result)
    } catch (err) {
        res.status(500).json({
            message:
                err.message || 'Some error occurred while retrieving users.',
        })
    }
}

// Find a single User with a userId
async function findOne(req, res) {
    try {
        const result = await User.findById(req.params.userId)
        return res.json(result)
    } catch (err) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error retrieving User with id ' + req.params.userId,
                })
            }
        }
    }
}

// Update a User identified by the userId in the request
async function update(req, res) {
    try {
        const result = await User.updateById(
            req.params.userId,
            new User(req.body)
        )
        return res.json(result)
    } catch (err) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    message: 'Error updating User with id ' + req.params.userId,
                })
            }
        }
    }
}

// Delete a User with the specified userId in the request
async function deleteUser(req, res) {
    try {
        const result = await User.remove(req.params.userId)
        return res.send(result)
    } catch (err) {
        if (err) {
            if (err.kind === 'n ot_found') {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Could not delete User with id ' + req.params.userId,
                })
            }
        }
    }
}

// Delete all User from the database.
async function deleteAll(req, res) {
    try {
        const result = await User.removeAll()
        return res.send(result)
    } catch (err) {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all users.',
            })
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteUser,
    deleteAll,
}
