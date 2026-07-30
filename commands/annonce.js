const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorEmbed = new EmbedBuilder()
            .setDescription('Veuillez saisir un texte | Syntaxe : /annonce [TEXTE]')
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorEmbed]
        });
    }

    const pollEmbed = new EmbedBuilder()
        .setTitle('📢 Annonce')
        .setDescription(args.join(' '))
        .setColor('#5865F2')
        .setFooter({
            text: 'Saturn | Commande annonce',
            iconURL: message.author.displayAvatarURL()
        });

    const msg = await message.channel.send({
        embeds: [pollEmbed]
    });

    await msg.react('✅');
};

module.exports.help = {
    name: 'annonce'
};