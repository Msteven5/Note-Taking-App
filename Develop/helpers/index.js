const fs = require('fs/promises');


const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

async function readFromFile() {
    let data = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(data);
}

async function appendToFile(data) {
    try {
        return await fs.appendFile('./db/db.json', JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    uuid,
    readFromFile,
    appendToFile
}