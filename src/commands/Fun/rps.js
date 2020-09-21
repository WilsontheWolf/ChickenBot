const Discord = require("discord.js");

exports.execute = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Choose `rock`, `paper` or `scissors`");
    let user,
        status = 0,
        bot = Math.floor(Math.random() * 3);
    if(["rock", "r"].includes(args[0])) user = 0;
    if(["paper", "p"].includes(args[0])) user = 1;
    if(["scissors", "s"].includes(args[0])) user = 2;

    if(bot == user) status = 2;
    if(bot == 0 && user == 1) status = 1;
    if(bot == 0 && user == 2) status = 0;
    if(bot == 1 && user == 0) status = 0;
    if(bot == 1 && user == 2) status = 1;
    if(bot == 2 && user == 0) status = 1;
    if(bot == 2 && user == 1) status = 0;

    message.channel.send(`I chose ${bot ? (bot==1 ? "`Paper`" : "`Scissors`") : "`Rock`"}, `
                        +`${status==2 ? "we tie" :  (status ? "you win" : "you lose")}`)
};
  
exports.data = {
    permissions: 51200,
    guildOnly: false,
    aliases: [],
    name: "rps",
    desc: "Fight the bot in rock paper scissors.",
    usage: "rps <r, p, s>",
    perm: 0
};