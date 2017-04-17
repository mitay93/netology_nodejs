const ChatApp = require('./chat');
let webinarChat = new ChatApp('webinar'),
  facebookChat = new ChatApp('=========facebook'),
  vkChat = new ChatApp('---------vk');

let chatOnMessage = (message) => {
    console.log(message);
  },
  closeChat = () => {
    console.log("Чат вконтакте закрылся :(");
  },
  readyToWebinar = () => {
    console.log('Готовлюсь к ответу');
  };

webinarChat.on('message', chatOnMessage)
  .on('message', readyToWebinar);
facebookChat.on('message', chatOnMessage);
vkChat.setMaxListeners(2);
vkChat.on('message', chatOnMessage)
  .on('message', readyToWebinar)
  .on('close', closeChat);

// Закрыть вконтакте
setTimeout(() => {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
}, 10000);

// Закрыть фейсбук
setTimeout(() => {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000);

// Закрыть чат вебинара
setTimeout(() => {
  console.log('Закрываю чат вебинара');
  webinarChat.removeListener('message', chatOnMessage);
}, 30000);