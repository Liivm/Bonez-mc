const Discord = require("discord.js");
const { Message } = require("discord.js");
const Client = require("../../classes/Unicron");
const ms = require("ms");
const BaseCommand = require("../../classes/BaseCommand");

const category = new Discord.Collection();
category.set("fun", "Indeed very cool **Fun commands**.");
category.set("misc", "Miscellaneous commands! over over the door");
category.set("utility", "**Utility** commands that can help you do better.");
category.set(
  "moderation",
  "Simple **Moderation** commands to strict your server from rule breakers!"
);
category.set(
  "settings",
  "Fully **Customizable** Configurations. including simplistic interactive configuration setups."
);
category.set(
  "dynamic",
  "**Dynamic Text/Voice System!** Which Allows users to create their own text/voice Channels to enhance your community environment as your users continue to meet new people."
);
category.set(
  "ticket",
  "Wonderful **Ticket System** for ease of server management."
);
category.set("search", "Searching commands!");
category.set("staff", "Bot Staff Commands ONLY!");

module.exports = class extends BaseCommand {
  constructor() {
    super({
      config: {
        name: "help",
        description:
          "List all of my commands or show information about a specific command.",
        permission: "User"
      },
      options: {
        aliases: ["commands"],
        cooldown: 3,
        args: false,
        usage: "help [command | category]",
        donatorOnly: false
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
    const prefix = message.guild.db.settings("prefix");
    if (args.length) {
      if (category.has(args[0])) {
        let embed = new Discord.MessageEmbed()
          .setColor("ORANGE")
          .setTimestamp()
          .setDescription(
            `${category.get(args[0])}\n\`\`\`xl\nhelp [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(
                command =>
                  command.config.category.includes(args[0]) &&
                  !command.options.donatorOnly
              )
              .map(command => `\`${command.config.name}\``)
              .join(", ")}` || `\u200b`
          );
        if (
          client.commands
            .filter(
              command =>
                command.config.category.includes(args[0]) &&
                command.options.donatorOnly
            )
            .map(command => `\`${command.config.name}\``).length
        ) {
          embed.addField(
            `\u200b`,
            `[Premium Commands](${
              client.unicron.serverInviteURL
            } 'These commands are only exclusive to donators')
                            ${client.commands
                              .filter(
                                command =>
                                  command.config.category.includes(args[0]) &&
                                  command.options.donatorOnly
                              )
                              .map(command => `\`${command.config.name}\``)
                              .join(", ")}
                        `
          );
        } else {
          embed.addField(`\u200b`, "\u200b");
        }
        return message.channel.send(embed);
      }
      const name = args[0].toLowerCase();
      const command =
        client.commands.get(name) ||
        client.commands.find(
          c => c.options.aliases && c.options.aliases.includes(name)
        );
      if (!command) {
      } else {
        let embed = new Discord.MessageEmbed()
          .setColor("ORANGE")
          .setTitle(`**${command.config.name}** Command`)
          .setDescription(`${command.config.description}`)
          .addField(`Category`, `• ${command.config.category}`, true)
          .addField(`Cooldown`, `${ms(command.options.cooldown * 1000)}`, true);
        if (command.options.aliases && command.options.aliases.length !== 0)
          embed.addField(
            `Aliases`,
            `${command.options.aliases.join(", ")}`,
            true
          );
        if (command.config.permission)
          embed.addField(
            `Required Permission`,
            `\`\`\`html\n<${command.config.permission}>\n\`\`\``,
            false
          );
        if (
          command.options.clientPermissions &&
          command.options.clientPermissions.length !== 8
        )
          embed.addField(
            `Required Bot Permissions`,
            `\`\`\`html\n<${command.options.clientPermissions.join(
              "> <"
            )}>\n\`\`\``,
            false
          );
        if (command.options.usage)
          embed.addField(
            `Usage`,
            `\`\`\`html\n${command.options.usage}\n\`\`\``,
            false
          );
        if (command.options.donatorOnly)
          embed.setFooter("This command is exclusive only to donators");
        return message.channel.send(embed);
      }
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("")
        .setDescription(
          `If you want to join Bonez Support Server [Click Here](${client.unicron.serverInviteURL}) `
        )
        .addField(
          `${await client.getEmoji("staff")} Moderation Commands`,
          `\`!help Moderation, Only Admin can use these commands.\``,
          true
        )
        .addField(
          `${await client.getEmoji("settings")} Settings Commands`,
          `\`!help Settings, Only Admin Can use these commands.\``,
          true
        )
        .addField(`<a:arrow:783049866565779527> Ticket System`, `\`!Help Ticket, Make ticket commands for your server, Only Admin can use these commands.\``, true)
        .addField(`<a:arrow:783049866565779527> Dynamic Commands`, `\`!help Dynamic, Only Members with Manage Server Permissions can use these Commands.\``, true)
        .addField(
          ` <a:arrow:783049866565779527> Utility Commands`,
          `\`!help Utility, Fun & utils Commands.\``,
          true
        )
        .addField(`<a:arrow:783049866565779527> Search Commands`, `\`!help Search, Search commands\``, true)
        .addField(`<a:arrow:783049866565779527> Misc Commands`, `\`!help Misc, Get more infos about the bot,your server or user.\``, true)
        .addField("<a:arrow:783049866565779527> Fun Commands", `\`!help Fun, Some fun commands for you and your friends\``, true)
        .setImage('https://i.imgur.com/9RNexUR.gif')
        .setTimestamp()
    );
  }
};
