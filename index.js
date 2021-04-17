const Discord = require('discord.js');
//const { prefix, BOT_TOKEN } = require('./config.json');
const fs = require('fs');
const prefix = "!";


// create a new Discord Client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

// when the client is ready, this code will execute
// should only happen ONCE
client.once('ready', () => {
	console.log('Ready!');

	client.user.setPresence({
		game: {
			name: '!help for commands',
		},
	});

});

// listen for messages
client.on('message', async message => {
	// if message does not start with command or is from a bot exit
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.alisas && cmd.alisas.includes(commandName));

	// if not command is seen exit.
	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// try to run a command if found, if an error occurs, output error in a log to console and let's the user know
	try {
		command.execute(message, client, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	console.log(message.content);
});


// login to discord with this token
client.login(process.env.BOT_TOKEN);