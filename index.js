const { Client, Intents, MessageEmbed, DiscordAPIError, MessageAttachment } = require("discord.js");
const axios = require('axios');

const CAT_API_URL = "https://api.thecatapi.com/"

require('dotenv').config();

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
    if (message.content.toLowerCase().startsWith("gibcat -u")) {

      var img = "https://cataas.com/cat"

      if(message.content.indexOf(" ") != -1)
      {
          img += "/says/";
          var strs = message.content.substring(10).split(" ");
          for (i = 0; i < strs.length; i++)
          {
            img+=strs[i]+"%20"
          }
      }

      img += "?" + Math.random();

      const embed = new MessageEmbed()
      .setTitle("have a cat")
      .setImage(img);

      message.channel.send({ embeds: [embed] });
    }
    else if (message.content.toLowerCase().startsWith("gibcat"))
    {
      async function sameCat()
      {
        var cat;
        if(message.content.indexOf(" ") == -1)
        {cat = await axios.get('https://cataas.com/cat', {responseType: 'arraybuffer'}).catch((err) => {console.log(err)});}
        else
        {
          var url = 'https://cataas.com/cat/says/';
          var strs = message.content.substring(7).split(" ");
          for (i = 0; i < strs.length; i++)
          {
            url+=strs[i]+"%20"
          }

            cat = await axios.get(url, {responseType: 'arraybuffer'}).catch((err) => {console.log(err)});
        }

        try
        {
        const attachment = new MessageAttachment(cat.data, 'cat.jpg');

        const embed = new MessageEmbed()
        .setTitle("have a cat")
        .setImage("attachment://cat.jpg");

        message.channel.send({ embeds: [embed], files: [attachment] });
        } catch(e)
        {
          console.log(e);
        }
      }

      sameCat();
    }
  }
});



client.login(process.env.DISCORDBOTTOKEN);