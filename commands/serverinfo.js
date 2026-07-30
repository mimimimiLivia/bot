const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const guild = message.guild;

    const serverinfoEmbed = new EmbedBuilder()
        .setDescription('Informations sur le serveur')
        .setColor('#5865F2')
        .addFields(
            {
                name: 'Nom du serveur :',
                value: guild.name
            },
            {
                name: 'ID du serveur :',
                value: guild.id
            },
            {
                name: 'Nombre de membres :',
                value: `${guild.memberCount}`
            },
            {
                name: 'Propriétaire du serveur :',
                value: `<@${guild.ownerId}>`
            },
            {
                name: 'Serveur créé le :',
                value: moment.utc(guild.createdAt).format('LLL')
            },
            {
                name: 'Serveur rejoint le :',
                value: moment.utc(message.guild.members.me.joinedAt).format('LLL')
            },
            {
                name: 'Nombre de rôles :',
                value: `${guild.roles.cache.size}`
            },
            {
                name: 'Nombre de salons :',
                value: `${guild.channels.cache.size}`
            }
        )
        .setFooter({
            text: 'Saturn | Commande serverinfo',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [serverinfoEmbed]
    });

    console.log('Commande serverinfo exécutée');
};

module.exports.help = {
    name: 'serverinfo'
};