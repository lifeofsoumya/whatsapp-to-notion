const axios = require('axios');
require('dotenv').config();

async function sendToNotion(messages) {
    const databaseId = process.env.NOTION_DB;
    const notionToken = process.env.NOTION_API_KEY; // Replace with integration token

    for (const msg of messages) {
        try {
            const response = await axios.post(`https://api.notion.com/v1/pages`, {
                parent: { database_id: databaseId },
                properties: {
                    'Date': {
                        date: { start: msg.timeStamp }
                    },
                    'Message': {
                        rich_text: [{ text: { content: msg.message } }]
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${notionToken}`,
                    'Content-Type': 'application/json',
                    'Notion-Version': '2021-05-13'
                }
            });
            console.log("Page created successfully:", response.data);
        } catch (error) {
            if (error.response) {
                console.error("Error Data:", error.response.data);
                console.error("Error Status:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }
    }
}
module.exports = { sendToNotion }