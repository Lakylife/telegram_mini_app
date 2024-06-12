/*
 _    __  _  ___   ___   _ ___ ___  
| |  /  \| |/ | `v' / | | | __| __| 
| |_| /\ |   < `. .'| |_| | _|| _|  
|___|_||_|_|\_\ !_! |___|_|_| |___| 
              --2024--
https://github.com/Lakylife
Project Meme PizzaPenny.com 2024
*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const verifyTelegramWebAppData = require('./verifyTelegramWebAppData.js');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nastavení webhooku
bot.setWebHook(`${WEBHOOK_URL}/bot${TELEGRAM_BOT_TOKEN}`).then(() => {
  console.log(`Webhook set to ${WEBHOOK_URL}/bot${TELEGRAM_BOT_TOKEN}`);
}).catch(err => {
  console.error('Error setting webhook:', err);
});

// Telegram webhook route
app.post(`/bot${TELEGRAM_BOT_TOKEN}`, (req, res) => {
  console.log('Received request from Telegram:', req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Verifikace dat z WebApp
app.post('/verify', (req, res) => {
  const telegramInitData = req.body.initData;
  console.log('Received verification request:', telegramInitData);
  const isValid = verifyTelegramWebAppData(telegramInitData);

  if (isValid) {
    res.send('Data validation succeeded.');
  } else {
    res.send('Data validation failed.');
  }
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Funkce pro Telegram bota
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  console.log(`Received /start command from @${username}`);

  const welcomeMessage = `Hey @${username}! 🌟 Welcome to Pizza - your ultimate crypto playground! 🚀\n\n
Dive into the fun and start collecting free $Pizza tokens, or grab a boost to earn even more tokens in-game! 🎮\n\n
Complete tasks and be sure to snag those presale tokens on time. This is going to be huge, so start capturing awesome experiences today! 🏆\n\n
Got friends? Bring them along! The more, the merrier! 🌱\n\n
Remember: Pizza Penny is just the beginning of an amazing meme project. Be among the first! Opportunities await. 🌼`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Start Game', web_app: { url: 'https://mini.pizzapenny.com/' } }],
        [{ text: 'Join community', url: 'https://t.me/PizzaPennyEth' }]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options).catch(err => {
    console.error('Error sending message:', err);
  });
});

console.log("Starting bot");
