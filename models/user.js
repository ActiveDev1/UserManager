const sql = require('./db.js')

// constructor
const User = function (user) {
    this.name = user.name
    this.username = user.username
    this.age = user.age
}

User.create = (newUser) => {
    return new Promise((resolve, reject) => {
        sql.query('INSERT INTO `user` SET ?', newUser, (err, res) => {
            if (err) {
                console.log('error: ', err)
                return reject(err)
            }

            console.log('created user: ', { id: res.insertId, ...newUser })
            return resolve({ id: res.insertId, ...newUser })
        })
    })
}

User.findById = (userId) => {
    return new Promise((resolve, reject) => {
        sql.query(
            'SELECT * FROM `user` WHERE id = ? ',
            [userId],
            (err, res) => {
                if (err) {
                    console.log('error: ', err)
                    return reject(err)
                }

                if (res.length) {
                    console.log('found user: ', res[0])
                    return resolve(res[0])
                }

                // not found user with the id
                return reject({ kind: 'not_found' })
            }
        )
    })
}

User.getAll = () => {
    return new Promise((resolve, reject) => {
        sql.query('SELECT * FROM `user`', (err, res) => {
            if (err) {
                console.log('error: ', err)
                return reject(err)
            }

            console.log('users: ', res)
            return resolve(res)
        })
    })
}

User.updateById = (id, user) => {
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE `user` SET name = ?, username = ?, age = ? WHERE id = ?',
            [user.name, user.username, user.age, id],
            (err, res) => {
                if (err) {
                    console.log('error: ', err)
                    return reject(err)
                }

                if (res.affectedRows == 0) {
                    // not found user with the id
                    return reject({ kind: 'not_found' })
                }

                console.log('updated user: ', { id: id, ...user })
                return resolve({ id: id, ...user })
            }
        )
    })
}

User.remove = (id) => {
    return new Promise((resolve, reject) => {
        sql.query('DELETE FROM `user` WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.log('error: ', err)
                return reject(err)
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                return reject({ kind: 'not_found' })
            }

            console.log('deleted user with id: ', id)
            return resolve({
                message: `User with id ${id} deleted.`,
            })
        })
    })
}

User.removeAll = () => {
    return new Promise((resolve, reject) => {
        sql.query('DELETE FROM user', (err, res) => {
            if (err) {
                console.log('error: ', err)
                return reject(err)
            }

            console.log(`deleted ${res.affectedRows} users`)
            return resolve({ message: 'All user from database deleted' })
        })
    })
}

module.exports = User
