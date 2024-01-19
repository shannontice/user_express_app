// const express = require('express');
// const path = require('path');

// const app = express()
// const PORT = 3333

// // GET Route- listening for the client to visit localhost: 3333/test
// app.get('/test', (requestObj, responseObj) => {
//     responseObj.send('Hi from server')
// });

// app.get('/', (requestObj, responseObj) => {
//     responseObj.send('root visited')
// })

// app.get('/api/recpie', (requestObj, responseObj) => {
//     responseObj.send({
//         name: 'Mac and Cheese',
//         ingredients: ['cheese', 'pasta', 'heavy cream']
//     })
// })

// app.get('/page', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './index.html'));
// })

// app.use((requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './notfound.html'));
// })

// app.listen(PORT, () => {
//     console.log('Server started on port', PORT)
// })

// Listen for the part after the domain in this example localhost: 3333. 
// Second arg is a callback function --> Meaning if they visit that route trigger the callback function
// If they visit the route two arg are passed in the function a requestObj and a responseObj. 
// Once route are done call app.listen() to make them start listening. Add port number to make it start listening in this example 3333
// Local IP at 127.0.0.1
// Everyone has a virtial domain - localhost = your local computers IP address
// Every application runs under a port number so that differrent processes can be seperated
// Can add callback on litener to show that the server has started

// Post request is sending some information along with the request

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express()
const PORT = 3333

async function getUserData() {
    const users = await fs.promises.readFile('./data.json', 'utf8');

    return JSON.parse(users);
}

async function saveUserData(usersArr) {
    await fs.promises.writeFile('./data.json', JSON.stringify(usersArr, null, 2));

    console.log('User data updated')
}

// Opening up the middleware channel to allow json to be sent through from the clinet
app.use(express.json());

// Share of create a get route for every file in the public folder
app.use(express.static('./public'))

// Open CORS to all domains
app.use(cors());

// Route to retreive/get all users from the json database
app.get('/api/users', async (requestObj, responseObj) => {
    const users = await getUserData();

    responseObj.send(users);
});

// Route to add a user to the JSON database
app.post('/api/users', async (requestObj, responseObj) => {
    // Get the old users array
    const users = await getUserData();


    // Overwrite the old array with the newly upated array
    if (!users.find(user => user.username === requestObj.body.username)) {
        // Push the body obj from the clients to our old array
        users.push(requestObj.body);

        await saveUserData(users);

        return responseObj.send({
            message: 'User Add!'
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


app.listen(PORT, () => {
    console.log('Server started on port', PORT)
});

// Downloaded insomnia which allows you to make front end like requests