const token = process.env.DISCORD_TOKEN;
const channelId = process.env.CHANNEL_ID;
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
    console.log(`Bot online sebagai ${client.user.tag}`);

    const channel = await client.channels.fetch(channelId);

    // Pesan saat bot online
    await channel.send('🤖 Bot sudah aktif.');

    // Black Market: 01:00, 04:00, 07:00, 10:00, 13:00, 16:00, 19:00, 22:00
    cron.schedule('0 1,4,7,10,13,16,19,22 * * *', async () => {
        try {
            await channel.send({
                content: '@everyone 🚨 Black Market sudah refresh! Cek sekarang!'
            });
            console.log('Pesan Black Market terkirim');
        } catch (err) {
            console.error(err);
        }
    });

    console.log('Jadwal Black Market aktif.');
});

const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot aktif');
}).listen(process.env.PORT || 3000);

client.login(token);