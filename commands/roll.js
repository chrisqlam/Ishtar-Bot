const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'roll',
	description: 'Roll for your anime lover',
	usage: '',
	cooldown: 5,
	execute: async (message) => {
		//const randomPage = Math.floor((Math.random() * 306) + 1);
		const variables = {
			page: 1,
		};
		const query = `
        query ($page: Int) {
			Page(page: $page, perPage: 50) {
			  media (status: RELEASING, type: ANIME, format: TV) {
				type
				title {
				  userPreferred
				}
				characters {
				  edges {
					id
					node {
					  id
					  image {
						large
					  }
					  name {
						full
					  }
					}
				  }
				}
			  }
			}
		  }`;

		const url = ('https://graphql.anilist.co'),
			options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					query: query,
					variables: variables,
				}),
			};
		fetch(url, options)
			.then(resolve => resolve.json())
			.then(json => {
				const randomElementArray = Math.floor((Math.random() * json.data.Page.media.length) - 1);
				const randomElement = json.data.Page.media[randomElementArray];
				const randomCharacter = randomElement.characters.edges[Math.floor((Math.random() * randomElement.characters.edges.length) + 1)];
				console.log(randomElement.title.userPreferred);
				console.log (randomElementArray);
				if (randomCharacter != null) {
					console.log('character exists')
				} else {
					console.log('character does not exist')
				}


				const waifuInfoEmbed = new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle(randomElement.title.userPreferred)
					.addFields(
						{ name: 'Name', value:  randomCharacter.node.name.full },
					)
					.setImage(randomCharacter.node.image.large)
					.setFooter(`Requested by ${message.author.username}`);
				message.channel.send(`${message.author}, your anime lover is`)
					.then(message.channel.send(waifuInfoEmbed))
					.catch(error => {
						message.channel.send(error);
					});
			});

	},
};