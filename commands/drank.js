module.exports = {
	name: 'drank',
	description: 'You drank? GOOD JOB!!',
	execute(message) {
		message.channel.send(`${message.author.username}, Nice job!`);
	},
};