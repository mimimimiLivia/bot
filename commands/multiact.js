const { EmbedBuilder, ActivityType } = require('discord.js');

module.exports.run = async (bot, message, args, id, config) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const multiactEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setDescription(
            'Le multiactivity a été activé ! Pour retirer le multiactivity, veuillez redémarrer le bot.'
        )
        .setFooter({
            text: 'Saturn | Commande multiact',
            iconURL: message.author.displayAvatarURL()
        });

    await message.channel.send({
        embeds: [multiactEmbed]
    });

    const statuslist = config.statuslist;

    setInterval(async () => {
        try {
            const random = Math.floor(Math.random() * statuslist.length);

            await bot.user.setPresence({
                activities: [
                    {
                        name: statuslist[random],
                        type: ActivityType.Playing
                    }
                ],
                status: config.status || 'online'
            });

        } catch (error) {
            console.error(error);
        }
    }, 6000);

    console.log('Multiactivity activé');
};

module.exports.help = {
    name: 'multiact'
};