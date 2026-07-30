const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    const banUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

    if (!banUser) {
        const banUserEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "L'utilisateur est introuvable. Veuillez réessayer.\nSyntaxe : /ban @utilisateur [raison]"
            );

        return message.channel.send({
            embeds: [banUserEmbed]
        });
    }

    if (
        !message.member.permissions.has(
            PermissionFlagsBits.BanMembers
        )
    ) {
        const banPermissionEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "Vous n'avez pas la permission d'utiliser cette commande ! (Permission BAN_MEMBERS requise)"
            );

        return message.channel.send({
            embeds: [banPermissionEmbed]
        });
    }

    if (!banUser.bannable) {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "Je ne peux pas bannir cet utilisateur (rôle supérieur ou permissions insuffisantes)."
            );

        return message.channel.send({
            embeds: [embed]
        });
    }

    const banReason =
        args.slice(1).join(' ') || 'Aucune raison spécifiée';

    try {
        await banUser.ban({
            reason: banReason
        });

        const banSuccessEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription(
                `✅ ${banUser.user.tag} a été banni avec succès.\n**Raison :** ${banReason}`
            );

        await message.channel.send({
            embeds: [banSuccessEmbed]
        });

        console.log('Commande ban exécutée');
    } catch (err) {
        console.error(err);

        const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription(
                "Une erreur est survenue lors du bannissement."
            );

        await message.channel.send({
            embeds: [errorEmbed]
        });
    }
};

module.exports.help = {
    name: 'ban'
};