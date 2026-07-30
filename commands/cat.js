const { EmbedBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    try {

        const { body } = await superagent.get(
            'https://api.thecatapi.com/v1/images/search'
        );

        const catEmbed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🐱 Cat Generator')
            .setImage(body[0].url)
            .setFooter({
                text: 'Saturn | Commande cat',
                iconURL: message.author.displayAvatarURL()
            });

        await message.channel.send({
            embeds: [catEmbed]
        });

    } catch (err) {
        console.error(err);

        const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription("Impossible de récupérer une image de chat.");

        await message.channel.send({
            embeds: [errorEmbed]
        });
    }
};

module.exports.help = {
    name: 'cat'
};