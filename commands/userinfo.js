const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const user =
        message.mentions.users.first() ||
        message.author;

    const usernameEmbed = new EmbedBuilder()
        .setDescription(`Informations de ${user.tag}`)
        .setColor('#5865F2')
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            {
                name: 'ID :',
                value: user.id,
                inline: true
            },
            {
                name: 'Compte créé le :',
                value: moment.utc(user.createdAt).format('LLL'),
                inline: true
            },
            {
                name: 'Nom :',
                value: user.tag
            },
            {
                name: 'Lien de la PP :',
                value: user.displayAvatarURL({ dynamic: true })
            }
        )
        .setFooter({
            text: 'Saturn | Commande userinfo',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [usernameEmbed]
    });

    console.log('Commande userinfo exécutée');
};

module.exports.help = {
    name: 'userinfo'
};