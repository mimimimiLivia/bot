const { EmbedBuilder } = require("discord.js");
 
module.exports.run = async (bot, message, args, id) => {
  if (message.author.id != id) return;
  if (message.author.bot) return;
 
  await message.delete();
 
  if (!args[0]) {
    let askErrorEmbed = new EmbedBuilder()
      .setDescription("Veuillez poser une question. | Syntaxe : !8ball [QUESTION]")
      .setColor("Random");
 
    return message.reply({ embeds: [askErrorEmbed] });
  }
 
  let replies = [
    "oui.",
    "non.",
    "certainement.",
    "hé oui Jamy !",
    "pourquoi pas.",
    "absolument.",
    "je ne sais pas.",
    "evidemment.",
    "oui, mais non."
  ];
 
  let question = args.slice(0).join(" ");
  let res = Math.floor(Math.random() * replies.length);
 
  let askEmbed = new EmbedBuilder()
    .setColor("Random")
    .setFooter({
      text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande 8ball`,
      iconURL: message.author.displayAvatarURL()
    })
    .setAuthor({
      name: `Question posée : ${question}`
    })
    .setDescription(`Réponse du bot :8ball: : ${replies[res]}`);
 
  message.channel.send({ embeds: [askEmbed] });
  console.log("Commande 8ball exécutée");
};
 
module.exports.help = {
  name: "8ball"
};
