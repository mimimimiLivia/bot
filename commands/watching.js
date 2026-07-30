const { EmbedBuilder, ActivityType } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorWatchingEmbed = new EmbedBuilder()
            .setDescription('Veuillez saisir un statut. | Syntaxe : /watching [TEXTE]')
            .setColor('#FF0000');

        return message.reply({
            embeds: [errorWatchingEmbed]
        });
    }

    const watchingStatus = args.join(' ');

    bot.user.setPresence({
        activities: [
            {
                name: watchingStatus,
                type: ActivityType.Watching
            }
        ],
        status: 'online'
    });

    const watchingSuccessEmbed = new EmbedBuilder()
        .setDescription(
            `Votre statut est désormais **${watchingStatus}** ! Afin de supprimer le statut d'activité, exécutez la commande **/delact**`
        )
        .setColor('#5865F2')
        .setFooter({
            text: 'Saturn | Commande watching',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [watchingSuccessEmbed]
    });

    console.log('Commande watching exécutée');
};

module.exports.help = {
    name: 'watching'
};