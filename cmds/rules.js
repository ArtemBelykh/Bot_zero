const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(Bot,message,args)=>{
    message.channel.send('Правила сервера!');
    message.channel.send('1)Запрещается материться.');
    message.channel.send('2)Запрещается порнография.');
    message.channel.send('2)Запрещается выкладывание сторонних ссылок');
    message.channel.send('Разрешаются ссылки сайтов: ');
    message.channel.send('Discord.com');
    message.channel.send('vk.com');
    message.channel.send('youtube.com');
    message.channel.send('google.com');
    message.channel.send('============================');
    message.channel.send('ВАЖНО!!! Если вы нарушите один из пунктов правил,то вы будете забанены!!!Не знание правил не освобождает от ответственности!!!');
};

module.exports.help = {
    name: "rules"
};
