const { EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    if (!args.length) {
        const vfErrorEmbed = new EmbedBuilder()
            .setDescription('Veuillez poser une question. | Syntaxe : /vf [QUESTION]')
            .setColor('#FF0000');

        return message.reply({
            embeds: [vfErrorEmbed]
        });
    }

    const replies = ['Vrai.', 'Faux.'];
    const question = args.join(' ');
    const res = Math.floor(Math.random() * replies.length);

    const vfEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setAuthor({
            name: `Question posée : ${question}`
        })
        .setDescription(`Réponse du bot : **${replies[res]}**`)
        .setFooter({
            text: 'Saturn | Commande vf',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [vfEmbed]
    });

    console.log('Commande vf exécutée');
};

module.exports.help = {
    name: 'vf'
};