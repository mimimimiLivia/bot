const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const helpEmbed = new EmbedBuilder()
        .setTitle('𝙎𝙖𝙩𝙪𝙧𝙣 𝙎𝙚𝙡𝙛𝙗𝙤𝙩 🌙')
        .setDescription(
            'Page d\'aide principale\n' +
            'Selfbot by vyia\n' +
            'Version du Selfbot : 1.0.0\n' +
            'Prefix : +\n' +
            'Nombre de commandes : '
        )
        .setColor('#5865F2')
        .addFields(
            {
                name: '**__Modération :__**',
                value:
                    'ban, kick, sondage, annonce, deletec, deleter,\nclear, nuke, setservername, setservericon, unban, softban'
            },
            {
                name: '**__Infos :__**',
                value:
                    'ping, serverinfo, botinfo, userinfo, membercount, serverowner'
            },
            {
                name: '**__Fun :__**',
                value:
                    'avatar, volpp, daronned, hug, caresse, cheh, cat, cf, 8ball, gp\ngoulag, rate, vf'
            },
            {
                name: '**__Settings :__**',
                value:
                    'shutdown, multiact, stream, game, listening, watching,\nmultinick, setpp, resetact'
            },
            {
                name: '**__Raid :__**',
                value:
                    'destroy, ddosvoc, deleterole, deletechannel, createrole, createchannel, adminrole, banall, gpall'
            }
        )
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(
            'https://cdn.discordapp.com/attachments/635433329021419520/635453826031419392/image1.gif'
        )
        .setFooter({
            text: 'Saturn | Commande help',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [helpEmbed]
    });

    console.log('Commande help exécutée');
};

module.exports.help = {
    name: 'help'
};