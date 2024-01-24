const router = require('express').Router();
const db = require('../db/connection')


// Can import the index.js without calling it by name since it is within the db folder.

// const { getUserData, saveUserData } = require('../db')


// Route to retreive/get all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // Make a query to the db and get all rows of data from the users table
    try {
        const [users] = await db.query('SELECT * FROM users')

        responseObj.json(users);
    }
    catch (err) {
        console.log(err)
    }

});


// Route to add a user to the JSON database
router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    const userData = requestObj.body;

    // Check if the user already exists
    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username]);

        // Check if a user was found matching that username
        if (results.length) {
            return responseObj.json({
                error: 402,
                message: 'That user already exists'
            })
        }
    }
    catch (err) {
        console.log(err)
    }

    // Run a query to insert a new user into the users table, with out requestObj.body data (username, email, password)
    try {
        const [results] = await db.query
            ('INSERT INTO users (username, email, password) VALUES (?,?,?)',
                [userData.username, userData.email, userData.password])

        responseObj.json({
            message: 'User added successfully',
            insertId: results.insertId
        })
    }
    catch (err) {
        console.log(err)
    }
});



// const users = await getUserData();
// const userData = requestObj.body



// // Overwrite the old array with the newly upated array
// if (!users.find(user => user.username === userData.username) && userData.username) {
//     // Push the body obj from the clients to our old array

//     // Creates a property on our userData that creates a new original ID
//     userData.id = v4();

//     users.push(userData);

//     await saveUserData(users);

//     return responseObj.send({
//         message: 'User Added!'
//     })
// }

// responseObj.send({
//             error: 402,
//             message: 'User already exists'
//         })

// // Respond back to the client
// responseObj.send({
//     message: 'User added!'
// })
// });

// Get Route to retuen a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id

    try {
        const [results] = await db.query('SELECT * FROM users WHERE id = ?', [user_id])

        if (results.length) {
            return responseObj.json({
                error: 402,
                message: 'That user already exists'
            })
        }


        responseObj.json({
            error: 404,
            message: 'User not found'
        })
    }
    catch (err) {
        console.log(err)
    }
})

// const users = await getUserData();

// const user = users.find(user => user.id === user_id);

// if (user) {
//     return responseObj.send(user);
// }
// else {
//     responseObj.send({
//         error: 404,
//         message: 'User not found with that ID'
//     })
// }


// Delete Route to remove a user from the database
router.delete('/users/:id', async (requestObj, responseObj) => {
    // Get the user date
    const user_id = requestObj.params.id;

    try {
        await db.query('DELETE FROM users WHERE id = ?', [user_id])


        responseObj.send({
            message: 'User Deleted Successfully!'
        })
    }
    catch (err) {
        console.log(err)
    }
});


// // Filter out the user object matching our param id from the users array
// const filtered = users.filter(usrObj => usrObj.id !== user_id)

// // Overwrite the old array with the updates array
// await saveUserData(filtered);

// responseObj.send({
//     message: 'User Deleted Successfully!'



// Wildcard Path --> Has to go at the bottom or it will catch all routes before they get a chance to run
// app.get('*', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/index.html'))
// })


module.exports = router;