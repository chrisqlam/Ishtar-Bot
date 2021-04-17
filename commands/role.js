const Discord = require('discord.js');

module.exports = {
    name: 'role',
    description: 'Sets up reaction role message',

    async execute(message, client, args) {

        const channelID = message.mentions.channels.first();
        if (!channelID) return message.reply('Please specify the channel')

        const desc = args.slice(1).join(" ");
        if (!desc) return message.reply('Please add a description')


        const calcifer = message.guild.roles.cache.find(role => role.name === "Calcifer")
        const arthur = message.guild.roles.cache.find(role => role.name === "Arthur")
        const merlin = message.guild.roles.cache.find(role => role.name === "Merlin")
        const keeb = message.guild.roles.cache.find(role => role.name === "Keebs")
        const nsfw = message.guild.roles.cache.find(role => role.name === "エッチ")

        const nsfwEmoji = '🚫'
        const arthurEmoji = '🐶'
        const merlinEmoji = '🐱'
        const calciferEmoji = '😼'
        const keebEmoji = '⌨'

        let embed = new Discord.MessageEmbed()
            .setColor('#fff')
            .setTitle('Select Roles to Receive')
            .setDescription(`🚫 - NSFW\n
        🐶 - Arthur\n
        🐱 - Merlin\n
        😼 - Calcifer\n
        ⌨ - Keyboards`);

        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react(nsfwEmoji)
        await msgEmbed.react(arthurEmoji)
        await msgEmbed.react(merlinEmoji)
        await msgEmbed.react(calciferEmoji)
        await msgEmbed.react(keebEmoji)

        client.on('messageReactionAdd', async (reaction, user) => {
            console.log('start adding')
            if (reaction.message.partial) await reaction.message.fetch();
            console.log('1')
            if (reaction.partial) await reaction.fetch()
            console.log('2')
            if (user.bot) return;
            console.log('3')
            if (!reaction.message.guild) return;
            console.log('4')
            console.log(channelID.id)
            if (reaction.message.channel.id === channelID.id) {
                console.log('5')
                if (reaction.emoji.name === keebEmoji) {
                    console.log('keeb role add')
                    await reaction.message.guild.members.cache.get(user.id).roles.add(keeb)
                }
                console.log('6')
                if (reaction.emoji.name === nsfwEmoji) {
                    console.log('nsfw role add')
                    await reaction.message.guild.members.cache.get(user.id).roles.add(nsfw)
                }
                console.log('7')
                if (reaction.emoji.name === arthurEmoji) {
                    console.log('arthur role add')
                    await reaction.message.guild.members.cache.get(user.id).roles.add(arthur)
                }
                console.log('8')
                if (reaction.emoji.name === calciferEmoji) {
                    console.log('calcifer role add')
                    await reaction.message.guild.members.cache.get(user.id).roles.add(calcifer)
                }
                console.log('9')
                if (reaction.emoji.name === merlinEmoji) {
                    console.log('merlin role add')
                    await reaction.message.guild.members.cache.get(user.id).roles.add(merlin)
                }
            }
            else {
                return;
            }
        })
        client.on('messageReactionRemove', async (reaction, user) => {
            console.log('start removing')
            if (reaction.message.partial) await reaction.message.fetch();
            console.log('1')
            if (reaction.partial) await reaction.fetch()
            console.log('2')
            if (user.bot) return;
            console.log('3')
            if (!reaction.message.guild) return;
            console.log('4')
            console.log(channelID.id)
            if (reaction.message.channel.id === channelID.id) {
                console.log('5')
                if (reaction.emoji.name === keebEmoji) {
                    console.log('keeb role remove')
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(keeb)
                }
                console.log('6')
                if (reaction.emoji.name === nsfwEmoji) {
                    console.log('nsfw role remove')
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(nsfw)
                }
                console.log('7')
                if (reaction.emoji.name === arthurEmoji) {
                    console.log('arthur role remove')
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(arthur)
                }
                console.log('8')
                if (reaction.emoji.name === calciferEmoji) {
                    console.log('calcifer role remove')
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(calcifer)
                }
                console.log('9')
                if (reaction.emoji.name === merlinEmoji) {
                    console.log('merlin role remove')
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(merlin)
                }
            }
            else {
                return;
            }
        })

    }
}