const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const user = message.mentions.users.first();

    if (!user) {
        const errorEmbed = new EmbedBuilder()
            .setDescription(
                'Veuillez mentionner un utilisateur. | Syntaxe : +kiss [@USER]'
            )
            .setColor('#FF0000');

        return message.channel.send({
            embeds: [errorEmbed]
        });
    }

    const replies = [
        "https://i.giphy.com/LDFtlGes4w0b5n815P.webp",
        "https://i.giphy.com/7H8oPLfh2G6clbbUVA.webp",
        "https://c.tenor.com/jN35LrknUpkAAAAC/tenor.gif",
        "https://c.tenor.com/5jhwSnExvoEAAAAC/tenor.gif",
        "https://c.tenor.com/qZtGzrrmpYUAAAAd/tenor.gif",
        "https://c.tenor.com/6mwmy72yC-IAAAAd/tenor.gif",
        "https://c.tenor.com/Xc6y_eh0IcYAAAAd/tenor.gif",
        "https://c.tenor.com/IeSi0qaEni4AAAAd/tenor.gif",
        "https://c.tenor.com/jN35LrknUpkAAAAC/tenor.gif",
        "https://c.tenor.com/WxITy4XYFVUAAAAC/tenor.gif",
        "https://c.tenor.com/kRMTd3OW_n0AAAAd/tenor.gif",
        "https://c.tenor.com/-P82knPil4oAAAAC/tenor.gif"
    ];

    const res = Math.floor(Math.random() * replies.length);

    const askEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setAuthor({
            name: `${message.author.username} a embrassé ${user.username}`
        })
        .setImage(replies[res])
        .setFooter({
            text: 'Saturn Bot | Commande kiss',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({ embeds: [askEmbed] });

    console.log('Commande kiss exécutée');
};

module.exports.help = {
    name: 'kiss'
};