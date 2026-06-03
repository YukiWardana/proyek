const token = process.env.DISCORD_TOKEN;
const channelId = process.env.CHANNEL_ID;
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const http = require('http');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', async () => {
    console.log(`Bot online sebagai ${client.user.tag}`);

    const channel = await client.channels.fetch(channelId);

    await channel.send('🤖 Bot sudah aktif.');

    // Black Market
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

    console.log('Jadwal Black Market aktif.');
});

// Debug Discord
client.on('shardDisconnect', (event, id) => {
    console.log(`Shard ${id} disconnect. Code: ${event?.code}`);
});

client.on('shardReconnecting', (id) => {
    console.log(`Shard ${id} reconnecting`);
});

client.on('shardResume', (id, replayed) => {
    console.log(`Shard ${id} resumed. Replayed: ${replayed}`);
});

client.on('shardError', (err) => {
    console.error('Shard Error:', err);
});

// Status tiap menit
setInterval(() => {
    console.log(
        'Discord Status:',
        client.ws.status,
        'Ping:',
        client.ws.ping
    );
}, 60000);

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

// Web server untuk Render
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot aktif');
}).listen(process.env.PORT || 3000);

client.login(token);