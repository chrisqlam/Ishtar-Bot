module.exports = {
	name: 'drank',
	description: 'You drank? GOOD JOB!!',
	execute(message) {
		message.channel.reply(`${message.author.username}, Nice job!`);
	},
};