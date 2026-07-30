const { EmbedBuilder, ActivityType } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorGameEmbed = new EmbedBuilder()
            .setDescription(
                'Veuillez saisir un statut. | Syntaxe : /game [TEXTE]'
            )
            .setColor('#FF0000');

        return message.reply({
            embeds: [errorGameEmbed]
        });
    }

    const gameStatus = args.join(' ');

    bot.user.setPresence({
        activities: [
            {
                name: gameStatus,
                type: ActivityType.Playing
            }
        ],
        status: 'online'
    });

    const gameSuccessEmbed = new EmbedBuilder()
        .setDescription(
            `Votre statut est désormais **${gameStatus}** ! Afin de supprimer le statut d'activité, exécutez la commande **/delact**`
        )
        .setColor('#00FF00')
        .setFooter({
            text: 'Saturn | Commande game',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [gameSuccessEmbed]
    });

    console.log('Commande game exécutée');
};

module.exports.help = {
    name: 'game'
};