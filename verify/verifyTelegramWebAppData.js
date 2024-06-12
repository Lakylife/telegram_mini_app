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
const crypto = require('crypto');

const TELEGRAM_BOT_TOKEN = process.env.VERIFY_TOKEN;

const verifyTelegramWebAppData = (telegramInitData) => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get('hash');
  initData.delete('hash');

  // Seřadíme klíče a vytvoříme data-check-string
  const dataToCheck = [...initData.entries()]
    .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
    .sort()
    .join('\n');

  // Vytvoříme HMAC-SHA-256 podpis pro bot token s konstantou "WebAppData"
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(TELEGRAM_BOT_TOKEN).digest();
  const computedHash = crypto.createHmac('sha256', secretKey).update(dataToCheck).digest('hex');

  console.log('Data to check:', dataToCheck);
  console.log('Computed hash:', computedHash);
  console.log('Provided hash:', hash);

  return computedHash === hash;
};

module.exports = verifyTelegramWebAppData;
