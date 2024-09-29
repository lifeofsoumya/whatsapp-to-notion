const fs = require("node:fs");
const path = require("path");

async function copyItems(messages) {
    let output = "Date\t\tMessage\n";
    output += "-------------------------------\n";

    messages.forEach(msg => {
        output += `${new Date(msg.timeStamp).toLocaleDateString("en-In", { day: '2-digit', month: 'short', year: 'numeric' })}\t${msg.message}\n`;
    });
    const outDir = path.resolve(__dirname, "../output", "copiable_output.txt")
    fs.writeFile(outDir, output, (err) => {
        if (err) {
            console.error("Error writing to file:", err.message);
            return;
        }
        console.log(`Messages written to ${outDir}`);
    });
}

module.exports = { copyItems };