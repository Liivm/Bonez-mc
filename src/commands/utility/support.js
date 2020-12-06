
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'support',
                description: 'Shows Support Server, Invite link.',
                permission: 'User',
            },
            options: {
                aliases: ['invite'],
                clientPermissions: ['EMBED_LINKS'],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: '',
                donatorOnly: false,
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
        const OWNER = await client.users.fetch(client.unicron.owner, false);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setTitle('Bonez Support')
                                    .setImage("https://i.imgur.com/Mvo5MDz.gif")
            .setDescription(`
[My server](${client.unicron.serverInviteURL})
[Add me to your](https://discord.com/api/oauth2/authorize?client_id=780050163309215755&permissions=8&scope=bot)`)
            .setFooter(`Made by ${OWNER.tag} & Rachelle#1000`)
        );
    }
}