const { EmbedBuilder } = require("discord.js");
 
module.exports.run = async (bot, message, args, id) => {
  if (message.author.id != id) return;
  if (message.author.bot) return;
 
  let user = message.mentions.users.first();
 
  await message.delete();
 
  if (!user) {
    let ErrorMentionUser = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`Avatar de ${message.author.username}\nPour afficher la PP d'un autre utilisateur, faites **!avatar [@user]**`)
      .setImage(message.author.displayAvatarURL({ size: 1024 }))
      .setFooter({
        text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande avatar`,
        iconURL: message.author.displayAvatarURL()
      });
 
    return message.channel.send({ embeds: [ErrorMentionUser] });
  }
 
  let EmbedAvatarResult = new EmbedBuilder()
    .setColor("Random")
    .setDescription(`Avatar de ${user.username}`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setFooter({
      text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande avatar`,
      iconURL: message.author.displayAvatarURL()
    });
 
  message.channel.send({ embeds: [EmbedAvatarResult] });
  console.log("Commande avatar exécutée");
};
 
module.exports.help = {
  name: "avatar"
};
 
