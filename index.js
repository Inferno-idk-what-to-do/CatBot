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
  // if message is in test server, featherteeth #commands, wolfy #bot-commands, or walter
  if(message.guild.id == "779787578039074857" || message.channel.id == "909670105263243324" || 
    message.channel.id == "933826202039353474" || message.guild.id == "754765312187957378")
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
        {cat = await axios.get('https://cataas.com/c', {responseType: 'arraybuffer'}).catch((err) => {console.log(err)});}
        else
        {
          var url = 'https://cataas.com/c/s';
          var strs = message.content.substring(7).split(" ");

          let addText = false;
          let textToAdd = [""];
          strs.every(s =>
          {
            s = s.toLowerCase()
            if(s.startsWith('-s'))
            {
              addText = true;
              textToAdd = message.content.substring((message.content.toLowerCase().indexOf("-s") + 3)).split(" ");
              return false;
            }
            return true;
          });

          let textUrl = "";
          if(addText)
          {
            textUrl += "/"
            for (i = 0; i < textToAdd.length; i++)
            {
              textUrl+=textToAdd[i]+"%20"
            }
          }

          let filterUrl = "?";
          strs.every(s =>
            {
              s = s.toLowerCase();
              if(s.startsWith('-f'))
              {
                if(s.charAt(s.indexOf('-f') + 2) == 'b')
                {
                  filterUrl += "fi=blur&";
                  // return false;
                }
                else if(s.charAt(s.indexOf('-f') + 2) == 'm')
                {
                  filterUrl += "fi=mono&";
                  // return false;
                }
                else if(s.charAt(s.indexOf('-f') + 2) == 's')
                {
                  filterUrl += "fi=sepia&"
                  // return false;
                }
                else if(s.charAt(s.indexOf('-f') + 2) == 'n')
                {
                  filterUrl += "fi=negative&"
                  // return false;
                }
                else if(s.charAt(s.indexOf('-f') + 2) == 'p')
                {
                  filterUrl += "fi=paint&"
                  // return false;
                }
                else if(s.charAt(s.indexOf('-f') + 2) == 'x')
                {
                  filterUrl += "fi=pixel&"
                  // return false;
                }
              }
              else if(s.startsWith('-c'))
              {
                filterUrl += "c=" + strs[strs.indexOf(s) + 1] + "&";
              }
              else if(s.startsWith('-m'))
              {
                filterUrl += "s=" + strs[strs.indexOf(s) + 1] + "&";
              }
              return true;
            });
            console.log("message sending with the image url -> " + url + textUrl + filterUrl);
            cat = await axios.get(url + textUrl + filterUrl, {responseType: 'arraybuffer'}).catch((err) => {console.log(err); message.channel.send("bozo moment")});
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
    else if(message.content.toLowerCase().startsWith("gibdog"))
    {
      message.channel.send("fuck you <@" + message.author.id + "> cats are better, i mean my name is literally " + 
                            "catbot i have no idea what you were expecting " + 
                            (message.author.id != 663587651424747520 ? "||emily that goes for you too bitch||" : ""));
    }
    else if(message.content.toLowerCase().startsWith("gibhelp"))
    {
      const embed = new MessageEmbed()
          .setTitle("**help is here!**")
          .setDescription("*filters, color, and magnitude can be called in any order, but text must be last followed by the text desired*")
          .addField("-fb", "blur image")
          .addField("-fm", "monochrome filter on image")
          .addField("-fs", "sepia filter on image")
          .addField("-fn", "negative image")
          .addField("-fp", "paint filter on image")
          .addField("-fx", "pixelate image")
          .addField("-c __", "follow with color of text")
          .addField("-m __", "follow with magnitude (size) of text")
          .addField("-s __", "follow with text");

      message.author.send({embeds: [embed]});
    }
  }
});

client.login(process.env.DISCORDBOTTOKEN);