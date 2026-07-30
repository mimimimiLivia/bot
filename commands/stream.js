const { EmbedBuilder, ActivityType } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorStreamEmbed = new EmbedBuilder()
            .setDescription('Veuillez saisir un statut. | Syntaxe : /stream [TEXTE]')
            .setColor('#FF0000');

        return message.reply({
            embeds: [errorStreamEmbed]
        });
    }

    const streamStatus = args.join(' ');

    bot.user.setPresence({
        activities: [
            {
                name: streamStatus,
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/saturnproject'
            }
        ],
        status: 'online'
    });

    const streamSuccessEmbed = new EmbedBuilder()
        .setDescription(
            `Votre statut est désormais **${streamStatus}** ! Afin de supprimer le statut d'activité, exécutez la commande **/delact**`
        )
        .setColor('#5865F2')
        .setFooter({
            text: 'Saturn | Commande stream',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [streamSuccessEmbed]
    });

    console.log('Commande stream exécutée');
};

module.exports.help = {
    name: 'stream'
};