const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorEmbed = new EmbedBuilder()
            .setDescription('Veuillez saisir un texte | Syntaxe : /sondage [TEXTE]')
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorEmbed]
        });
    }

    const pollEmbed = new EmbedBuilder()
        .setTitle('📊 Sondage')
        .setColor('#5865F2')
        .setDescription(args.join(' '))
        .setFooter({
            text: 'Saturn | Veuillez répondre au sondage en réagissant',
            iconURL: message.author.displayAvatarURL()
        });

    const msg = await message.channel.send({
        embeds: [pollEmbed]
    });

    await msg.react('✅');
    await msg.react('❌');
};

module.exports.help = {
    name: 'sondage'
};