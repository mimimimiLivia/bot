const Discord = require ("discord.js");

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id != id) return;
    if (message.author.bot) return;

    message.delete()

    let user = message.mentions.users.first()

    let errorDaronnedEmbed = new Discord.RichEmbed()
    .setDescription("Veuillez mentionner un utilisateur. | Syntaxe : /daronned [@USER]")
    .setColor("RANDOM")
    if (!args[0]) return message.channel.send(errorDaronnedEmbed)

    let daronnedEmbed = new Discord.RichEmbed()
    .setDescription(`${user.username} se fait daronned par ${message.author.username}`)
    .setColor("RANDOM")
    .setImage("https://image.noelshack.com/fichiers/2019/43/1/1571638360-daronned.jpeg")
    .setFooter(`𝙎𝙖𝙩𝙪𝙧𝙣 𝙎𝙚𝙡𝙛𝙗𝙤𝙩 | Commande daronned`, message.author.avatarURL);
  
    message.channel.send(daronnedEmbed)

    console.log("Commande daronned exécuté")

    }
    
module.exports.help = {
    name: "daronned"
};