const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (Bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!args[0]) return Bot.send("Вы не указали пользователя");
    if(!rUser) return Bot.send("Пользователь не найден");
    
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!rUser.roles.has(role.id)) return Bot.send("Этот пользователь уже может говорить");
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
    delete Bot.mutes[rUser.id];
    fs.writeFile('./mutes.json',JSON.stringify(Bot.mutes),(err)=>{
        if(err) console.log(err);
    });

    rUser.removeRole(role);
};
module.exports.help = {
    name: "unmute"
};