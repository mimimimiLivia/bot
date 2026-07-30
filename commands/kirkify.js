const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Jimp, JimpMime } = require("jimp");


const CHARLIE_KIRK_IMAGE_URL = "https://github.com/tututu1294-jpg/kirkify/blob/main/Untitled.png?raw=true";


async function fetchJimp(url) {
  return Jimp.read(url);
}


async function faceSwap(targetUrl) {
  const res = await fetch("https://deepfake-face-swap-ai.p.rapidapi.com/swap-face", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "9890379ae2msh24c53a91f5f6ef6p1abccdjsn94c03a367fef",
      "x-rapidapi-host": "deepfake-face-swap-ai.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_url: CHARLIE_KIRK_IMAGE_URL,
      target_url: targetUrl,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`RapidAPI ${res.status}: ${err}`);
  }

  const data = await res.json();
  if (!data.image_url) throw new Error("Pas d'image_url: " + JSON.stringify(data));
  return { type: "url", value: data.image_url };
}


async function overlayKirk(targetUrl) {
  const [target, kirkFace] = await Promise.all([
    fetchJimp(targetUrl),
    fetchJimp(CHARLIE_KIRK_IMAGE_URL),
  ]);

  const size = target.width;

  
  const faceSize = Math.floor(size * 0.65);
  kirkFace.resize({ w: faceSize, h: faceSize });

  
  const x = Math.floor((size - faceSize) / 2);
  const y = Math.floor(size * 0.05);

  target.composite(kirkFace, x, y);

  const buffer = await target.getBuffer(JimpMime.png);
  return { type: "buffer", value: buffer };
}

module.exports.run = async (bot, message, args, id) => {
  if (message.author.id !== id) return;
  if (message.author.bot) return;

  const user = message.mentions.users.first();

  
  const drawMode = args.includes("draw") || args.includes("dessin");

  await message.delete();

  
  if (!user) {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(
        `Avatar de ${message.author.username}\n` +
        `**+kirkify [@user]** → face-swap IA (vraie photo)\n` +
        `**+kirkify draw [@user]** → superposition (dessin/avatar)`
      )
      .setImage(message.author.displayAvatarURL({ size: 1024 }))
      .setFooter({
        text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande kirkify`,
        iconURL: message.author.displayAvatarURL(),
      });
    return message.channel.send({ embeds: [embed] });
  }

  const loadingMsg = await message.channel.send(
    drawMode ? "Kirkification (mode pp manga) en cours..." : "Kirkification en cours..."
  );

  try {
    const avatarUrl = user.displayAvatarURL({ size: 1024, extension: "png", forceStatic: true });

    let result;
    if (drawMode) {
      result = await overlayKirk(avatarUrl);
    } else {
      try {
        result = await faceSwap(avatarUrl);
      } catch (err) {
        
        console.warn("Face-swap échoué, bascule en mode overlay:", err.message);
        result = await overlayKirk(avatarUrl);
      }
    }

    await loadingMsg.delete();

    if (result.type === "url") {
      
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${user.username} a été kirkifié !`)
        .setImage(result.value)
        .setFooter({
          text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande kirkify`,
          iconURL: message.author.displayAvatarURL(),
        });
      message.channel.send({ embeds: [embed] });

    } else {
      
      const attachment = new AttachmentBuilder(result.value, { name: "kirkified.png" });
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${user.username} a été kirkifié ! (mode dessin)`)
        .setImage("attachment://kirkified.png")
        .setFooter({
          text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande kirkify`,
          iconURL: message.author.displayAvatarURL(),
        });
      message.channel.send({ embeds: [embed], files: [attachment] });
    }

    console.log(`Commande kirkify exécutée sur ${user.username} (mode: ${drawMode ? "overlay" : "faceswap"})`);

  } catch (err) {
    console.error("Erreur lors de la kirkification :", err);
    await loadingMsg.delete();

    const errorEmbed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Kirkification échouée. Vérifie ton URL d'image Kirk et réessaie.")
      .setFooter({
        text: `𝙎𝙖𝙩𝙪𝙧𝙣 𝘽𝙤𝙩 | Commande kirkify`,
        iconURL: message.author.displayAvatarURL(),
      });
    message.channel.send({ embeds: [errorEmbed] });
  }
};

module.exports.help = {
  name: "kirkify",
};