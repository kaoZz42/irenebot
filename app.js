const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;
const chalk = require('chalk');

// Consele logs

client.on('ready', () => {
  console.log(chalk.bgGreen.black('\n#################################\n \n Encendiendo BOT ... OK\n Cargando comandos ... OK\n Entrando al servidor ... OK\n BOT Irene está operativa ... OK\n \n#################################\n'));
});

client.on('guildCreate', guild => {
  console.log(`BOT Irene se ha unido a (${guild.name}) : ${new Date()}`);
});

client.on('guildDelete', guild => {
  console.log(`BOT Irene se fue de (${guild.name}) : ${new Date()}`);
});

client.on('disconnect', () => {
  console.log(`BOT Irene ha perdido la conexión! ... : ${new Date()}`);
});

client.on('reconnecting', () => {
  console.log(`BOT Irene está estableciendo conexión! ... : ${new Date()}`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  client.channels.get('410069022957240320').sendMessage(`Bienvenido ${member.user} al Discord de kaoZz!`);
  console.log(`(${member.user}) se ha unido al Discord!`);
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  client.channels.get('410069022957240320').sendMessage(`Hasta la vista ${member.user}, te echaremos de menos!`);
  console.log(`(${member.user}) se fue del Discord!`);
});

client.on('guildBanAdd',(guild, user) => {
  guild.channels.get('408181364723286016').sendMessage(`El usuario (${user.username}) ha sido baneado!`);
  console.log(`El usuario (${user.username}) ha sido baneado!`);
});

client.on('guildBanRemove',(guild, user) => {
  guild.channels.get('408181364723286016').sendMessage(`El usuario (${user.username}) ha sido desbaneado!`);
  console.log(`El usuario (${user.username}) ha sido desbaneado!`);
});

client.on('roleCreate', role => {
  let guild = role.guild;
  client.channels.get('408181364723286016').sendMessage(`Un nuevo rol (${role.name}) se ha creado!`);
  console.log(`Un nuevo rol (${role.name}) se ha creado!`);
});

client.on('roleDelete', role => {
  let guild = role.guild;
  client.channels.get('408181364723286016').sendMessage(`El rol (${role.name}) ha sido eliminado!`);
  console.log(`El rol (${role.name}) ha sido eliminado!`);
});

client.on('channelCreate', channel => {
  client.channels.get('408181364723286016').sendMessage(`Un canal de (${channel.type}) texto/voz con el nombre (${channel.name}) fue creado!`);
  console.log(`Un canal de (${channel.type}) texto/voz con el nombre (${channel.name}) fue creado!`);
});

client.on('channelDelete', channel => {
  client.channels.get('408181364723286016').sendMessage(`El canal de (${channel.type}) texto/voz con el nombre (${channel.name}) fue eliminado!`);
  console.log(`El canal de (${channel.type}) texto/voz con el nombre (${channel.name}) fue eliminado!`);
});

client.on('messageDelete', msg => {
  client.channels.get('408181364723286016').sendMessage(`El mensaje: (${msg.cleanContent}) fue eliminado de (${msg.channel.name})!`);
  console.log(`El mensaje: (${msg.cleanContent}) fue eliminado de (${msg.channel.name})!`);
});

client.on('messageDeleteBulk', messages => {
  console.log(`(${messages.size}) mensajes eliminados ... !`);
});

// Client Commands

var prefix = "!"
client.on('message', message => {
  var guild = message.guild;
	let args = message.content.split(' ').slice(1);
	var result = args.join(' ');

	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;

  if (message.content.startsWith(prefix + 'adduser')) {
    guild.member(message.mentions.users.first()).addRole('410048632629231636').catch(error => console.log(error));
  } else

  if (message.content.startsWith(prefix + 'removeuser')) {
    guild.member(message.mentions.users.first()).removeRole('410048632629231636').catch(error => console.log(error));
  } else

  if (message.content.startsWith(prefix + "clear")) {
   let messagecount = parseInt(result);
   message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  } else

	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
	} else

  if (message.content.startsWith(prefix + 'online')) {
    message.channel.sendMessage(`BOT Irene está operativa!`);
  } else

	// if (message.content.startsWith(prefix + 'send')) {
	// 	client.channels.get('ID de canal aquí').sendMessage('Mensaje aquí');
	// } else

	if (message.content.startsWith(prefix + '_setgame')) {
		if (!result) {
			result = null;
		}
		client.user.setGame(result);
	} else

	if (message.content.startsWith(prefix + '_setstatus')) {
		if (!result) {
			result = null;
		}
		client.user.setStatus(result);
	}
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('debug', e => {
  console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
});

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(token);
