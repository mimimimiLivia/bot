const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const rateErrorEmbed = new EmbedBuilder()
            .setDescription(
                'Veuillez poser une question. | Syntaxe : /rate [QUESTION]'
            )
            .setColor('#FF0000');

        return message.reply({
            embeds: [rateErrorEmbed]
        });
    }

    const replies = [
        '0/10', '1/10', '2/10', '3/10', '4/10',
        '5/10', '5/10', '6/10', '7/10', '8/10',
        '9/10', '10/10'
    ];

    const question = args.join(' ');
    const res = Math.floor(Math.random() * replies.length);

    const rateEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setFooter({
            text: 'Saturn | Commande rate',
            iconURL: message.author.displayAvatarURL()
        })
        .setDescription(
            `Je note **${question}** __${replies[res]}__.`
        );

    await message.channel.send({
        embeds: [rateEmbed]
    });

    console.log('Commande rate exécutée');
};

module.exports.help = {
    name: 'rate'
};