const { EmbedBuilder, ActivityType } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    bot.user.setPresence({
        activities: [
            {
                name: '𝙎𝙖𝙩𝙪𝙧𝙣 𝙎𝙚𝙡𝙛𝙗𝙤𝙩 🌙',
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/saturnproject'
            }
        ],
        status: 'online'
    });

    const resetSuccessEmbed = new EmbedBuilder()
        .setDescription('Votre status a été réinitialisé avec succès !')
        .setColor('#00FF00')
        .setFooter({
            text: 'Saturn | Commande reset',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [resetSuccessEmbed]
    });

    console.log('Commande reset exécutée');
};

module.exports.help = {
    name: 'reset'
};