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
const cors = require('cors')

const PORT = 3333

const app = express()


// db.query('INSERT INTO users (username, email, password) VALUES ("bob", "bob@test.com", "password")', (err,results) => {
//     if (err) return console.log(err);

//     console.log(results);
// });

// db.query('SELECT * FROM users', (err,results) => {
//     if (err) return console.log(err);

//     console.log(results);
// });

const api_routes = require('./routes/api_routes');


// Opening up the middleware channel to allow json to be sent through from the clinet
app.use(express.json());

// Share of create a get route for every file in the public folder
app.use(express.static('./public'))

// Open CORS to all domains
app.use(cors());

// Load Routes
app.use('/api', api_routes);

app.listen(PORT, () => {
    console.log('Server started on port', PORT)
});

// Downloaded insomnia which allows you to make front end like requests