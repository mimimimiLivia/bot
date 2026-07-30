const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const ping = Date.now() - message.createdTimestamp;

    const pingEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setDescription(`🏓 Mon ping est de : **${ping} ms**`)
        .setFooter({
            text: 'Saturn | Commande ping',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [pingEmbed]
    });

    console.log('Commande ping exécutée');
};

module.exports.help = {
    name: 'ping'
};