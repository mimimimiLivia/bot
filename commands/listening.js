const { EmbedBuilder, ActivityType } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorListeningEmbed = new EmbedBuilder()
            .setDescription(
                'Veuillez saisir un statut. | Syntaxe : /listening [TEXTE]'
            )
            .setColor('#FF0000');

        return message.reply({
            embeds: [errorListeningEmbed]
        });
    }

    const listeningStatus = args.join(' ');

    bot.user.setPresence({
        activities: [
            {
                name: listeningStatus,
                type: ActivityType.Listening
            }
        ],
        status: 'online'
    });

    const listeningSuccessEmbed = new EmbedBuilder()
        .setDescription(
            `Votre statut est désormais **${listeningStatus}** ! Afin de supprimer le statut d'activité, exécutez la commande **/delact**`
        )
        .setColor('#00FF00')
        .setFooter({
            text: 'Saturn | Commande listening',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [listeningSuccessEmbed]
    });

    console.log('Commande listening exécutée');
};

module.exports.help = {
    name: 'listening'
};