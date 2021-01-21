const Discord = require('discord.js');

module.exports = {
	name: 'userinfo',
	description: 'Grabs user info and displays it',
	usage: '@username',
	cooldown: 5,
	args: true,
	execute(message) {
		const user = message.mentions.members.first();
		const userInfoEmbed = new Discord.MessageEmbed()
			.setAuthor(user.user.username)
			.setColor('RANDOM')
			.setTitle(user.roles.highest.name)
			.setImage(user.user.avatarURL ({ format: 'png' }))
			.setFooter(user.guild.name);
		message.channel.send(userInfoEmbed);
	},
};