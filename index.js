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
  // if message is in test server, featherteeth #commands or wolfy #bot-commands
  if(message.guild.id == "779787578039074857" || message.channel.id == "909670105263243324" || message.channel.id == "933826202039353474")
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
      .setTitle("have a cat, " + message.author.name)
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

            cat = await axios.get(url, {responseType: 'arraybuffer'}).catch((err) => {console.log(err); message.channel.send("bozo moment")});
        }

        try
        {
        const attachment = new MessageAttachment(cat.data, 'cat.jpg');

        const embed = new MessageEmbed()
        .setTitle("have a cat, " + (message.member.nickname ?? message.author.username))
        .setImage("attachment://cat.jpg");

        message.channel.send({ embeds: [embed], files: [attachment] });
        } catch(e)
        {
          console.log(e);
        }
      }

      sameCat();
    }
    else if (message.content.toLowerCase().startsWith("gibdog"))
    {
      message.channel.send("fuck you <@" + message.author.id + "> cats are better, i mean my name is literally " + 
                            "catbot i have no idea what you were expecting " + 
                            (message.author.id != 937568619234209822 ? "||emily that goes for you too bitch||" : ""));
    }
  }
});



client.login(process.env.DISCORDBOTTOKEN);