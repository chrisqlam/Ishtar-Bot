module.exports = {
	name: 'drank',
	description: 'You drank? GOOD JOB!!',
	execute(message) {
		message.reply(`${message.author.username}, Nice job!`);
	},
};