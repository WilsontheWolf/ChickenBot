const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
    let emoji = '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(' ');
    let choices = args.join(' ').split('-');
    let title = choices.shift() || 'Poll';
    if(choices.length > 20 || choices.length < 2) return message.channel.send('Minimum amount of choices is 2 and maximum is 20');
    let poll = '';
    let i = 0;
    choices.forEach(c => {
      poll = poll + emoji[i] + ' ' + c + '\n';
      i++;
    })
    const embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(poll);
    let msg = await message.channel.send(embed);
    for (i in choices) {
       await msg.react(emoji[i])
    }
};
  
exports.data = {
    guildOnly: true,
    aliases: ["choose"],
    category: "misc",
    name: "poll",
    desc: "Creates a poll, start your choices with -'s.",
    usage: "poll [title] -<option> (-[option]...19)",
    perm: 1
};