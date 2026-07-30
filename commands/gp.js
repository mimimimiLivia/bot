const Discord = require ("discord.js");

module.exports.run = async (bot, message, args, id) => {

    if (message.author.id != id) return;
    if (message.author.bot) return;

    message.delete()
    
    }
    
module.exports.help = {
    name: "gp"
};