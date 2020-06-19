const Discord = require("discord.js");
module.exports = async (client) => {

    client.db.map(g=>g.banned).filter(v=>v!=null).forEach((arr)=>{
        Object.values(arr).forEach(v=>{
            let timeout = client.setTimeout(()=>{
                client.db.deleteProp(v.guild, `banned.${v.id}`)
                let guild = client.guilds.cache.get(v.guild)
                if(!guild.available || guild.me.hasPermission("BAN_MEMBERS")) return;
                guild.members.unban(v.id, "Automated unban")
            }, v.time-Date.now())
            client.bantimers[`${v.guild}-${v.id}`] = timeout
        })
    })

    Object.entries(client.db.get("REMINDERS")).forEach(u=>{
        Object.entries(u[1]).forEach(e=>{
            let id = e[0]
            if(id=="num") return;
            let {reason, created, channel, user, time} = e[1]
            let timeout = client.setTimeout(()=>{
                client.db.delete("REMINDERS", `${user}.${id}`)
                delete client.remindtimers[`${user}-${id}`]
                let embed = new Discord.MessageEmbed()
                .setTitle("Reminder")
                .setDescription(reason)
                .setColor("LUMINOUS_VIVID_PINK")
                .setTimestamp(created)
                .setFooter(`Set on `)
                client.channels.cache.get(channel).send(client.users.cache.get(user).toString(), {embed})
            }, time-Date.now())
            client.remindtimers[`${user}-${id}`] = timeout;
        })
    })

    console.log(`${client.colors.Green}${client.formatDate(new Date())} | I am online as ${client.user.tag}${client.colors.Reset}`)
    client.user.setActivity(`people on ${client.guilds.cache.size} servers`, { type: "WATCHING" });
    const embed = new Discord.MessageEmbed()
    .setTitle('Bot started')
    .setColor('ffff00')
    .setTimestamp()
    client.channels.cache.get(client.config.log).send(embed)
}