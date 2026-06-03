const token = process.env.DISCORD_TOKEN;
const channelId = process.env.CHANNEL_ID;
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const http = require('http');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
    console.log(`Bot online sebagai ${client.user.tag}`);

    const channel = await client.channels.fetch(channelId);

    await channel.send('🤖 Bot sudah aktif.');

    cron.schedule(
    '0 1,4,7,10,13,16,19,22 * * *',
    async () => {
        try {
            await channel.send({
                content: '@everyone 🚨 Black Market sudah refresh! Cek sekarang!'
            });

            console.log('Pesan Black Market terkirim');
        } catch (err) {
            console.error('CRON ERROR:', err);
        }
    },
    {
        timezone: 'Asia/Jakarta'
    }
);

    // TEST tiap menit
    cron.schedule('* * * * *', () => {
        console.log('Bot masih hidup:', new Date().toISOString());
    });

    console.log('Jadwal Black Market aktif.');
});

client.on('error', console.error);

client.on('disconnect', () => {
    console.log('Discord disconnect');
});

process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('exit', (code) => {
    console.log(`Process exit dengan code ${code}`);
});

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot aktif');
}).listen(process.env.PORT || 3000);

client.login(token);