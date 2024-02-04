require('dotenv').config()
const fs = require('fs');
const express = require('express');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
  checkUpdate: false,
});
const app = express();
const port = 8200; // Set your desired port number

let IDSChunk = []; // Empty array to store IDs

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
  IDSChunk = readIDSFromFile("output_3.txt"); // Load IDS from the file when the bot is ready
  console.log("IDS loaded from file:", IDSChunk);
});

client.on('messageCreate', async (message) => {
  if (message.content === "//start") {
    for (let i = 0; i < IDSChunk.length; i++) {
      const content = ` kc ${IDSChunk[i]} e:6 p<100 wl>100`;
      message.channel.send(content);
      await sleep(10000); // Wait for 10 seconds /.\
      console.log(`Sent message for ID ${IDSChunk[i]}`);
    }
    console.log("DONE SPAMMING");
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function readIDSFromFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  return data.split('\n').map(id => id.trim());
}

client.login(process.env.token);

app.get('/', (req, res) => {
  res.send('Hello World!'); // You can customize the response as needed
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
