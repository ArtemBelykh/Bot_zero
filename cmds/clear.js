const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (Bot,message,args) => {
    try{
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
    if(args[0]>100) return Bot.send("Укажите значение меньше 100");
    if(args[0]<1) return Bot.send("Укажите значение больше 1");
    message.channel.bulkDelete(args[0]).then(() =>{
        message.channel.send(`Удалено ${args[0]} сообщений`).then(msg => msg.delete(15*1000));
    });
    Bot.send(Botmessage);
}catch(err){
    console.log(err.name)
}
};
module.exports.help = {
    name: "clear"
};