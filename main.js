const fs = require("node:fs")
const path = require("path")
const { sendToNotion } = require("./services/notion");
const { copyItems } = require("./services/copiable");

async function fileRead() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "to-do-list-export.txt"), 'utf-8', (err, data) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }
            const messages = parseData(data);
            resolve(messages);
        });
    });
}

function parseData(data) {
    const lines = data.split('\n')
    const messages = []
    const excludeTerms = ['<Media omitted>', 'test message']

    lines.forEach(line => {
        const match = line.match(/(\d{1,2}\/\d{1,2}\/\d{2,4}, \s*\d{1,2}:\d{2}\s*[APM]{2}) - (.*?): (.*)/);

        if(match) {
            const timeStamp = new Date(match[1]).toISOString()
            const author = 'meXD'
            const message = match[3];
            if(!excludeTerms.includes(message)) messages.push({ timeStamp, message});
        }
    })
    return messages;
}

const main = async () => {
    try {
        const messages = await fileRead();
        await sendToNotion(messages);
    } catch (error) {
        console.error("An error occurred while processing the to-do list:");
        console.error(error.message);
    }
}

main();