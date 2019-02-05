const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(Bot,message,args)=>{
    const date = new Date()

    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()

    const time = 'time: ' + h + ':' + m + ':' + s
    ctx.reply(time)
};

module.exports.help = {
    name: "time"
};
