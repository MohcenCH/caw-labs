const fs = require('fs');
const path = require('path');

function createFile(fileName, text) {
    const filePath = path.join(__dirname, fileName);

    fs.writeFile(filePath, text, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log("The file has been saved");
        }
    });
    console.log(text)
}

const args = process.argv.slice(2);

const fileName = args[0];
const text = args.slice(1).join(' ');

createFile(fileName, text);