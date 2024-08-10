const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
        config: {
   name: "Odiamus",
   version: "1.0.0",
   role: 0,
   author: "Kaizenji",
   shortDescription: { en: "no prefix"},
   longDescription: { en: "an Ai powered by Kaizenji Ai"},
 category: "ai",
 countDown: 5,
},

onChat: async function ({ api, event }) {
 const message = event.body;
 const command = "Odiamus";

  if (message.indexOf(command) === 0 || message.indexOf(command.charAt(0).toUpperCase() + command.slice(1)) === 0) {

const args = message.split(/\s+/);
  args.shift();

const cotonouTime = moment.tz('Arfica/Cotonou');


        const date = cotonouTime.format('MMMM D, YYYY h:mm A');

try {
const { messageID, messageReply } = event;
 let prompt = args.join(' ');

if (messageReply) {
    const repliedMessage = messageReply.body;
      prompt = `${repliedMessage} ${prompt}`;
 }
     if (!prompt) {

      return api.sendMessage('✨ | Hey, 𝖨 am Odiamus 𝖠𝗂\n\n𝖧𝗈𝗐 can i assist you today?', event.threadID, messageID);
        }
        api.sendMessage('🤍 | Odiamus Ai is searching, please wait a moment..', event.threadID);    

      const gpt4 = `https://kai-gpt4-5e4314203253.herokuapp.com/api/gpt4?ask=${encodeURIComponent(prompt)}`;

     const response = await axios.get(gpt4);

        if (response.data && response.data.answer) {

            const generatedText = response.data.answer;

               api.sendMessage(`🤍 | Odiamus Ai \n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n⏰ | 🗓️: ${date}`, event.threadID, messageID);

        } else {

            console.error('API response did not contain expected data:', response.data);

            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);

       api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
}
},

  onStart: async function ({ api, event, args }) {
}
};