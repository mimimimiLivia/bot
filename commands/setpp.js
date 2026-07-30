const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const errorSetppEmbed = new EmbedBuilder()
            .setDescription('Veuillez saisir un lien. | Syntaxe : /setpp [URL]')
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorSetppEmbed]
        });
    }

    const url = args.join(' ');

    try {
        await bot.user.setAvatar(url);
    } catch (err) {
        const errorEmbed = new EmbedBuilder()
            .setDescription("Impossible de changer l'avatar (URL invalide ou limite Discord).")
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorEmbed]
        });
    }

    const setppEmbed = new EmbedBuilder()
        .setColor('#EA000D')
        .setThumbnail(url)
        .setDescription('Votre photo de profil a été mise à jour avec succès !')
        .setFooter({
            text: 'Saturn | Commande setpp',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [setppEmbed]
    });
};

module.exports.help = {
    name: 'setpp'
};