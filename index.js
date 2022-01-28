const { Client, Intents, MessageEmbed } = require("discord.js");
const Token = require('./token.js').varExport;

// Since discord.js exports an object by default, we can destructure it. Read up more here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
 
client.on("ready", () => {
  console.log("cat");
});
 
client.on("messageCreate", (message) => {
  if(message.channel.id == "909670105263243324" || message.channel.id == "779787578039074861")
  {
    if (message.content.startsWith("gibcat")) {

      var img = "https://cataas.com/cat"

      if(message.content.indexOf(" ") != -1)
      {
          img += "/says/" + message.content.substring(7).replace(" ", "%20");
      }

      img += "?" + Math.random();

      const embed = new MessageEmbed()
      .setTitle("have a cat")
      .setImage(img);

      message.channel.send({ embeds: [embed] });
    }
  }
});


client.login(Token);