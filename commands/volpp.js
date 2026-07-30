const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const user = message.mentions.members.first();

    if (!user) {
        const errorVolppEmbed = new EmbedBuilder()
            .setDescription('Veuillez mentionner un utilisateur. | Syntaxe : /volpp [@USER]')
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorVolppEmbed]
        });
    }

    const avatarURL = user.user.displayAvatarURL({ dynamic: true, size: 1024 });

    try {
        await bot.user.setAvatar(avatarURL);
    } catch (err) {
        const errorEmbed = new EmbedBuilder()
            .setDescription("Impossible de changer l'avatar (limite Discord ou URL invalide).")
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorEmbed]
        });
    }

    const photosteal = new EmbedBuilder()
        .setColor('#1dce65')
        .setThumbnail(avatarURL)
        .setDescription(
            `Vous avez volé avec succès la photo de profil à ${user} :white_check_mark: !`
        )
        .setFooter({
            text: 'Saturn | Commande volpp',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [photosteal]
    });

    console.log('Commande volpp exécutée');
};

module.exports.help = {
    name: 'volpp'
};