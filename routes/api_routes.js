const router = require('express').Router();
const { v4 } = require('uuid')

// Can import the index.js without calling it by name since it is within the db folder.

const { getUserData, saveUserData } = require('../db')


// Route to retreive/get all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    const users = await getUserData();

    responseObj.send(users);
});

// Route to add a user to the JSON database
router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    const users = await getUserData();
    const userData = requestObj.body


    // Overwrite the old array with the newly upated array
    if (!users.find(user => user.username === userData.username) && userData.username) {
        // Push the body obj from the clients to our old array

        // Creates a property on our userData that creates a new original ID
        userData.id = v4();

        users.push(userData);

        await saveUserData(users);

        return responseObj.send({
            message: 'User Added!'
        })
    }

    responseObj.send({
        error: 402,
        message: 'User already exists'
    })

    // Respond back to the client
    responseObj.send({
        message: 'User added!'
    })
});

// Get Route to retuen a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id

    const users = await getUserData();

    const user = users.find(user => user.id === user_id);

    if (user) {
        return responseObj.send(user);
    }
    else {
        responseObj.send({
            error: 404,
            message: 'User not found with that ID'
        })
    }
})

// Delete Route to remove a user from the database
router.delete('/users/:id', async (requestObj, responseObj) => {
    // Get the user date
    const users = await getUserData();
    const user_id = requestObj.params.id;

    // Filter out the user object matching our param id from the users array
    const filtered = users.filter(usrObj => usrObj.id !== user_id)

    // Overwrite the old array with the updates array
    await saveUserData(filtered); 

    responseObj.send({
        message:'User Deleted Successfully!'
    })
});


module.exports = router;