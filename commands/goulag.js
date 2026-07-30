const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const user = message.mentions.users.first();

    if (!user) {
        const errorEmbed = new EmbedBuilder()
            .setDescription(
                'Veuillez mentionner un utilisateur. | Syntaxe : /goulag [@USER]'
            )
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorEmbed]
        });
    }

    const goulagEmbed = new EmbedBuilder()
        .setDescription(
            `${user.username} a été envoyé au goulag par ${message.author.username}`
        )
        .setColor('#5865F2')
        .setImage(
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdclump.com%2Fwp-content%2Fuploads%2F2019%2F06%2Fgulag-800x450-768x432.jpg&f=1&nofb=1&ipt=9688f25db1ebbf722001c679745c6419d5928ebf8b1e28d9d743381694cc2225'
        )
        .setFooter({
            text: 'Saturn | Commande goulag',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [goulagEmbed]
    });

    console.log('Commande goulag exécutée');
};

module.exports.help = {
    name: 'goulag'
};