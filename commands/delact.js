const Discord = require ("discord.js");

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id != id) return;
    if (message.author.bot) return;
    message.delete()

    bot.user.setPresence({
      game: {
          name: ``,

      }
  });

    let delactSuccessEmbed = new Discord.RichEmbed()      
    .setDescription(`Votre status a été supprimé avec succès !`)
    .setColor("RANDOM")
    .setFooter(`𝙎𝙖𝙩𝙪𝙧𝙣 𝙎𝙚𝙡𝙛𝙗𝙤𝙩 | Commande delact`, message.author.avatarURL)

    message.channel.send(delactSuccessEmbed)
    
    console.log("Commande delact exécuté")

}

    
module.exports.help = {
    name: "delact"
};
