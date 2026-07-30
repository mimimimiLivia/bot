const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const kickUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

    if (!kickUser) {
        const kickUserEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "L'utilisateur est inexistant. Veuillez réessayer | Syntaxe : /kick @user [raison]"
            );

        return message.channel.send({
            embeds: [kickUserEmbed]
        });
    }

    if (
        !message.member.permissions.has(
            PermissionFlagsBits.KickMembers
        )
    ) {
        const kickPermissionEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "Vous n'avez pas la permission d'utiliser cette commande ! (Permission KICK_MEMBERS requise)"
            );

        return message.channel.send({
            embeds: [kickPermissionEmbed]
        });
    }

    if (!kickUser.kickable) {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "Je ne peux pas expulser cet utilisateur (rôle supérieur ou permissions insuffisantes)."
            );

        return message.channel.send({
            embeds: [embed]
        });
    }

    const kickReason =
        args.slice(1).join(' ') || 'Aucune raison spécifiée';

    try {
        await kickUser.kick(kickReason);

        const kickSuccessEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription(
                `✅ ${kickUser.user.tag} a été kick avec succès !\n**Raison :** ${kickReason}`
            );

        await message.channel.send({
            embeds: [kickSuccessEmbed]
        });

        console.log('Commande kick exécutée');
    } catch (err) {
        console.error(err);

        const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription("Une erreur est survenue lors du kick.");

        await message.channel.send({
            embeds: [errorEmbed]
        });
    }
};

module.exports.help = {
    name: 'kick'
};