const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(Bot,message,args)=>{
    message.channel.send('pong!');
};

module.exports.help = {
    name: "ping"
};
