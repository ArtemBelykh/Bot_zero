.listen(process.env.PORT || 5000);
const Discord = require('discord.js');
const Bot = new Discord.Client();
Bot.commands = new Discord.Collection();
const fs = require('fs');
Bot.mutes = require('./mutes.json');
let config = require('./config.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');
fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
    console.log(`Загружено ${jsfiles.length} комманд`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен!`);
        Bot.commands.set(props.help.name,props);
    });
});


Bot.on('ready', () => {
    console.log(`Запустился бот ${Bot.user.username}`);
    Bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });
    Bot.setInterval(()=>{
        for(let i in Bot.mutes){
            let time = Bot.mutes[i].time;
            let guildid = Bot.mutes[i].guild;
            let guild = Bot.guilds.get(guildid);
            let member = guild.members.get(i);
            let muteRole = member.guild.roles.find(r => r.name === "Muted"); 
            if(!muteRole) continue;

            if(Date.now()>= time){
                member.removeRole(muteRole);
                delete Bot.mutes[i];
                fs.writeFile('./mutes.json',JSON.stringify(Bot.mutes),(err)=>{
                    if(err) console.log(err);
                });
            }
        }

    },5000)

});
Bot.on('guildMemberAdd',(member)=>{
    let role = member.guild.roles.find(r => r.name === "[I]Незнакомчик");
    member.addRole(role);
});

Bot.on('message', async message => {
    if(message.author.Bot) return;
    if(message.channel.type == "dm") return;
    let uid = message.author.id;
    Bot.send = function (msg){
        message.channel.send(msg);
    };
    if(!profile[uid]){
        profile[uid] ={
            coins:10,
            warns:0,
            xp:0,
            lvl:1,
        };
    };
    let u = profile[uid];

    u.coins++;
    u.xp++;

    if(u.xp>= (u.lvl * 5)){
        u.xp = 0;
        u.lvl += 1;
    };


    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = Bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(Bot,message,args);
    Bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    Bot.uId = message.author.id;
});
Bot.login(token);
