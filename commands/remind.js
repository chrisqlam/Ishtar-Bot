module.exports = {
	name: 'remind',
	description: 'sets up a reminder for you',
	usage: ' #s/m/h reminderText (seconds, minutes or hours)',
	cooldown: 5,
	args: true,
	execute(message, args) {
		let time = args[0].replace(/[a-z||A-Z]$/g, '');
		const timemeasure = args[0].substring(args[0].length - 1, args[0].length);
		let msg = message.content.split(/\s/g);
		let check;
		function sendReminder() {
			message.reply(msg);
		}
		try {

			console.log('run remind');


			switch (timemeasure) {
			case 's':
				time *= 1000;
				break;
			case 'm':
				time *= 1000 * 60;
				break;
			case 'h':
				time *= 1000 * 60 * 60;
				break;
			default:
				check = false;
			}
			console.log(msg);
			// removes the command & time from message
			msg.splice(0, 1);
			console.log(msg);
			msg = msg.join(' ');
			console.log(msg);

			console.log(`${time} ${timemeasure} ${msg}`);
			console.log('send reminder');
			if (isNaN(args[0].substring(0, 1)) || check === false) {
				message.reply('Please ensure you set an amount of time to send your reminder. (s, m, h)');
			}
			else if (msg) {
				message.reply(`Okay, I'll remind you in ${args[0]}, baka.`);
				setTimeout(
					sendReminder, time,
				);
			}
		}
		catch (e) {
			console.log(e.stack);
			message.channel.send('An ERROR has occured, check the logs.');
		}
	},
};