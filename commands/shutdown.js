module.exports.run = async (bot, message, args, id) => {

    if (message.author.id !== id) return;
    if (message.author.bot) return;

    await message.delete().catch(() => {});

    console.log(`Shutdown demandé par ${message.author.tag}`);

    // arrêt du bot
    process.exit(0);
};

module.exports.help = {
    name: 'shutdown'
};