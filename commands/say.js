const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorSayEmbed = new EmbedBuilder()
            .setDescription('Veuillez saisir un texte. | Syntaxe : /say [TEXTE]')
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorSayEmbed]
        });
    }

    const sayMessage = args.join(' ');

    const sayMessageEmbed = new EmbedBuilder()
        .setDescription(sayMessage)
        .setColor('#5865F2');

    await message.channel.send({
        embeds: [sayMessageEmbed]
    });

    console.log('Commande say exécutée');
};

module.exports.help = {
    name: 'say'
};