const { EmbedBuilder } = require('discord.js');
const superagent = require('superagent');

const scheduled = new Map();


function parseDelay(input) {
    const timeMatch = input.match(/^(\d{1,2}):(\d{2})$/);
    if (timeMatch) {
        const now = new Date();
        const target = new Date();
        target.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2]), 0, 0);
        if (target <= now) target.setDate(target.getDate() + 1);
        return { ms: target - now, label: `à **${input}**` };
    }

    // Format Xh Xm (ex: 2h30m, 45m, 1h)
    const durationMatch = input.match(/^(?:(\d+)h)?(?:(\d+)m)?$/);
    if (durationMatch && (durationMatch[1] || durationMatch[2])) {
        const h = parseInt(durationMatch[1] || '0');
        const m = parseInt(durationMatch[2] || '0');
        const ms = (h * 60 + m) * 60 * 1000;
        if (ms <= 0) return null;
        const parts = [];
        if (h) parts.push(`${h}h`);
        if (m) parts.push(`${m}m`);
        return { ms, label: `dans **${parts.join('')}**` };
    }

    return null;
}

async function sendCat(channel, targetUser, requester) {
    try {
        const { body } = await superagent.get('https://api.thecatapi.com/v1/images/search');

        const catEmbed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🐱 Cat Generator')
            .setImage(body[0].url)
            .setFooter({
                text: `Saturn | Envoyé par ${requester.username}`,
                iconURL: requester.displayAvatarURL()
            });

        const dm = await targetUser.createDM();
        await dm.send({ embeds: [catEmbed] });
        return true;
    } catch (err) {
        console.error('[cat] Erreur lors de l\'envoi du DM :', err);
        return false;
    }
}

module.exports.run = async (bot, message, args, id) => {
    if (message.author.id !== id) return;
    if (message.author.bot) return;
    await message.delete().catch(() => {});

    // Récupère l'utilisateur mentionné
    const targetUser = message.mentions.users.first();
    if (!targetUser) {
        const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription('❌ Mentionne un utilisateur. Ex: `+catty @user` ou `+catty @user 07:30`');
        return message.channel.send({ embeds: [errorEmbed] });
    }

    const delayArg = args[1];

    if (!delayArg) {
        const success = await sendCat(message.channel, targetUser, message.author);
        if (!success) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription("❌ Impossible de récupérer une image ou d'envoyer le DM.");
            message.channel.send({ embeds: [errorEmbed] });
        }
        return;
    }

    const parsed = parseDelay(delayArg);
    if (!parsed) {
        const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription('❌ Format de délai invalide. Utilise `07:30` ou `2h30m`.');
        return message.channel.send({ embeds: [errorEmbed] });
    }

    if (scheduled.has(targetUser.id)) {
        clearTimeout(scheduled.get(targetUser.id));
    }

    const confirmEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('⏰ Chat planifié')
        .setDescription(`Un chat sera envoyé en DM à **${targetUser.username}** ${parsed.label}.`)
        .setFooter({ text: 'Saturn | Cat Scheduler', iconURL: message.author.displayAvatarURL() });

    await message.channel.send({ embeds: [confirmEmbed] });

    const timeout = setTimeout(async () => {
        scheduled.delete(targetUser.id);
        const success = await sendCat(message.channel, targetUser, message.author);
        if (!success) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`❌ Impossible d'envoyer le chat planifié à **${targetUser.username}**.`);
            message.channel.send({ embeds: [errorEmbed] });
        }
    }, parsed.ms);

    scheduled.set(targetUser.id, timeout);
};

module.exports.help = {
    name: 'catty'
};