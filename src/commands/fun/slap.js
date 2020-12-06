
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const slaps = [
    'https://i.imgur.com/0nl16Ea.gif',
    'https://i.imgur.com/A9nMdAX.gif',
    'https://i.imgur.com/mdEJZtA.gif',
    'https://i.imgur.com/mdEJZtA.gif',
    'https://i.imgur.com/iFJ2fky.gif',
    'https://i.imgur.com/3W6YmKx.gif',
    'https://i.imgur.com/bHYAdLA.gif',
    'https://i.imgur.com/oq77MKb.gif',
    'https://i.imgur.com/7NGNezg.gif',
    'https://i.imgur.com/RFWNaoF.gif'
];

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'slap',
                description: 'Give the user a slap!',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'slap <UserMention>',
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const user = message.mentions.users.first();
        if (!user) return message.channel.send('Oh oh... you gotta provide a valid user to slap :/');
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setImage(slaps[Math.floor(Math.random() * slaps.length)])
            .setDescription(`${message.author.username} slapped ${user.username}!`)
        );
    }
}