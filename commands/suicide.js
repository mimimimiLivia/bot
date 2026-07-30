const { EmbedBuilder } = require("discord.js");
 
module.exports.run = async (bot, message, args, id) => {
  if (message.author.id != id) return;
  if (message.author.bot) return;
 
  await message.delete();

 
  let replies = [
    "NBOMe + a-PVP",
    "2C-T-x + 4-MMC",
    "5-MeO-xxT + MAOI",
    "Ketamine + Alcool",
    "Ketamine + GHB",
    "Kétamine + Opioids",
    "Kétamine + Tramadol",
    "MXE + Alcool",
    "MXE + GHB",
    "MXE + Opioids",
    "MXE + Tramadol",
    "DXM + Alcool",
    "DXM + GHB",
    "DXM + Opioids",
    "DXM + Tramadol",
    "DXM + MAOI",
    "DXM + SSRI",
    "DXM + 4-MMC",
    "DXM + MDMA",
    "Amphetamines + a-PVP",
    "Amphetamines + Tramadol",
    "Amphetamines + MAOI",
    "MDMA + Tramadol",
    "MDMA + MAOI",
    "MDMA + DXM",
    "Cocaine + Opioids",
    "Cocaine + Tramadol",
    "Cocaine + MAOI",
    "a-PVP + NBOMe",
    "a-PVP + Amphetamines",
    "a-PVP + Tramadol",
    "a-PVP + MAOI",
    "4-MMC + 2C-T-x",
    "4-MMC + DXM",
    "4-MMC + Tramadol",
    "4-MMC + MAOI",
    "Alcool + Ketamine",
    "Alcool + MXE",
    "Alcool + DXM",
    "Alcool + GHB",
    "Alcool + Opioids",
    "Alcool + Tramadol",
    "Alcool + Benzodiazepines",
    "GHB + Ketamine",
    "GHB + MXE",
    "GHB + DXM",
    "GHB + Alcool",
    "GHB + Opioids",
    "GHB + Tramadol",
    "GHB + Benzodiazepines",
    "Opioids + Ketamine",
    "Opioids + MXE",
    "Opioids + DXM",
    "Opioids + Cocaine",
    "Opioids + Alcool",
    "Opioids + GHB",
    "Opioids + Tramadol",
    "Opioids + Benzodiazepines",
    "Tramadol + Ketamine",
    "Tramadol + MXE",
    "Tramadol + DXM",
    "Tramadol + Amphetamines",
    "Tramadol + MDMA",
    "Tramadol + Cocaine",
    "Tramadol + a-PVP",
    "Tramadol + 4-MMC",
    "Tramadol + Alcool",
    "Tramadol + GHB",
    "Tramadol + Opioids",
    "Tramadol + Benzodiazepines",
    "Tramadol + MAOI",
    "Tramadol + SSRI",
    "Benzodiazepines + Alcool",
    "Benzodiazepines + GHB",
    "Benzodiazepines + Opioids",
    "Benzodiazepines + Tramadol",
    "MAOI + 5-MeO-x",
    "MAOI + DXM",
    "MAOI + Amphetamines",
    "MAOI + MDMA",
    "MAOI + Cocaine",
    "MAOI + a-PVP",
    "MAOI + 4-MMC",
    "MAOI + Tramadol",
    "MAOI + SSRI",
    "SSRI + DXM",
    "SSRI + Tramadol",
    "SSRI + MAOI"
  ];
 
  let question = args.slice(0).join(" ");
  let res = Math.floor(Math.random() * replies.length);
 
  let askEmbed = new EmbedBuilder()
    .setColor("Random")
    .setFooter({
      text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande suicide`,
      iconURL: message.author.displayAvatarURL()
    })
    .setAuthor({
      name: `Voici un mélange de deux substances`
    })
    .setDescription(`Réponse du bot : ${replies[res]}`);
 
  message.channel.send({ embeds: [askEmbed] });
  console.log("Commande suicide exécutée");
};
 
module.exports.help = {
  name: "suicide"
};
