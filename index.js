const axios = require("axios");

async function sendMessage() {
    await axios.post(process.env.WEBHOOK_URL, {
        content: "Black Market ges!"
    });

    console.log("Pesan terkirim");
}

sendMessage().catch(console.error);