const Discord = module.require("discord.js");
let profile = require('./profile.json');
const fs = require("fs");
module.exports.run = async (Bot,message,args) => {
    let a = message.author
    let embed = new Discord.RichEmbed()
    .setDescription("Профиль аккаунта:")
    .setColor('#10c7e2')
    .addField("Имя",a.username)
    .setThumbnail(a.avatarURL)
    .addField("lvl",profile)
    Bot.send(embed);
};
module.exports.help = {
    name: "profileinfo"
};