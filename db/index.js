const fs = require('fs');
const path = require('path');
const DB_PATH = path.join (__dirname, './data.json');



async function getUserData() {
    const users = await fs.promises.readFile(DB_PATH, 'utf8');

    return JSON.parse(users);
}

async function saveUserData(usersArr) {
    await fs.promises.writeFile(DB_PATH, JSON.stringify(usersArr, null, 2));

    console.log('User data updated');
}

// If your property name and value name are the same you dont need to write out both --> getUserData: getUserData can just be written as shown below.ßß
module.exports = {
    getUserData,
    saveUserData
}