const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (Bot,message,args) => {
    let a = message.author
    let embed = new Discord.RichEmbed()
    .setDescription("Информация о сервере")
    .setColor('#10c7e2')
    .addField("Имя",a.username)
    .addField("Тэг",a.tag)
    .addField("Дискриминатор",a.discriminator)
    .addField("Создание аккаунта",a.createdAt)
    .addField("ID",a.id)
    .setThumbnail(a.avatarURL)

    Bot.send(embed);

};
module.exports.help = {
    name: "userinfo"
};