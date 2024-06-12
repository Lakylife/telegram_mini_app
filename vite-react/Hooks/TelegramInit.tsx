/*
 _    __  _  ___   ___   _ ___ ___  
| |  /  \| |/ | `v' / | | | __| __| 
| |_| /\ |   < `. .'| |_| | _|| _|  
|___|_||_|_|\_\ !_! |___|_|_| |___| 
              --2024--
https://github.com/Lakylife
Project Meme PizzaPenny.com 2024
*/

import React, { useEffect } from 'react';

const TelegramInit: React.FC = () => {
  useEffect(() => {
    // Tento kód by měl být součástí vaší webové aplikace
    const initData = (window as any).Telegram.WebApp.initData;
    fetch('https://api.examples.com/verify', { // Ujistěte se, že port odpovídá vašemu backend serveru
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ initData }),
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Telegram WebApp Initialization</h1>
    </div>
  );
};

export default TelegramInit;
