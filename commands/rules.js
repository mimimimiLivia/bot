const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const rulesEmbed = new EmbedBuilder()
        .setTitle('Règlement de 𝙎𝙖𝙩𝙪𝙧𝙣・🚀')
        .setColor('#5865F2')
        .addFields(
            {
                name: '**__Global :__**',
                value:
                    "La pub sur le serveur est interdite, y compris les MP.\n\n" +
                    "L'utilisation de Selfbot est autorisée sur le serveur, salon CMD & médias. Merci de ne pas en abuser.\n\n" +
                    "Tout pseudo & PP avec des symboles racistes/antisémites/xénophobes/homophobes est interdit et sanctionné d'un ban irrévocable.\n\n" +
                    "Il est proscrit d'harceler un membre du serveur sauf en cas de veski.\n\n" +
                    "Les insultes sont autorisées dans la limite du raisonnable."
            },
            {
                name: '**__Texte :__**',
                value:
                    "Le spam est interdit.\n\n" +
                    "Les commandes BOTS sont à utiliser uniquement en salon cmd.\n\n" +
                    "Il est interdit de poster des images pornographiques.\n\n" +
                    "Drop des dox est interdit, aucune exception n'est faite."
            },
            {
                name: '**__Vocal :__**',
                value:
                    "Les soundboards et les voicemods sont interdits.\n\n" +
                    "Déranger/troll/insulter les membres dans les vocaux Chill (OKLM, Chill, Musique).\n\n" +
                    "Le bot musique est prioritaire dans le salon musique.\n\n" +
                    "Les embrouilles vocales sont uniquement tolérées en salon Clash et Place Publique."
            },
            {
                name: '**__Invitations :__**',
                value:
                    "Les double comptes / tokens afin de booster vos invitations sont interdits.\n\n" +
                    "Les doubles comptes afin de troll sont interdits."
            }
        )
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(
            'https://cdn.discordapp.com/attachments/633988999362641960/636104191038717975/les_regles.gif'
        );

    await message.channel.send({
        embeds: [rulesEmbed]
    });

    console.log('Commande rules exécutée');
};

module.exports.help = {
    name: 'rules'
};