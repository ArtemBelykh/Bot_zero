const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (Bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!args[0]) return Bot.send("Вы не указали пользователя");
    if(!rUser) return Bot.send("Пользователь не найден");
    if(!args[1]) return Bot.send("Укажите время в секундах");
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role){
        role = await message.guild.createRole({
            name:"Muted",
            permissions:[]
        });
        message.guild.channels.forEach(async (channel,id) => {
            await channel.overwritePermissions(role,{
                SEND_MESSAGES:false,
                ADD_REACTIONS:false
            });
        });
    };
    if(rUser.roles.has(role.id)) return Bot.send("Этот пользователь уже не может говорить");
    Bot.mutes[rUser.id] = {
        guild:message.guild.id,
        time:parseInt(Date.now() + (args[1]*1000)),
    };
    fs.writeFile('./mutes.json',JSON.stringify(Bot.mutes),(err)=>{
        if(err) console.log(err);
    });

    rUser.addRole(role);
};
module.exports.help = {
    name: "mute"
};