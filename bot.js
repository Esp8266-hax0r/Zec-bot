const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);
const fetch = require('node-fetch')
const weather = require("weather-js");
const superagent = require("superagent");
const db = require("quick.db");
const ms = require("ms");
const pms = require("parse-ms");
const randomPuppy = require('random-puppy');
const invites = {};
const Promise = require('bluebird');
const fs = require("fs");
const _ = require('lodash');
const moment = require('moment');
const normal = ' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const wide =	' ⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖǫʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾǫᴿˢᵀᵁⱽᵂˣʸᶻ';
const arraySort = require('array-sort');
var profanities = require('profanities');
const table = require('table');
let sneks = require("./sneks.json");
const antispam = require('discord-anti-spam');
const ascii = require('ascii-art');
var randomCase = require('random-case');
var request = require("request");
const randomWord = require("random-words")
const request1 = require("node-superfetch");
const bot = new Discord.Client();
const TOKEN = "";
var hack = 0;
var sent = 0;
let user;
let aat = 1;
let antiswear = 1;
var consoleLog = 1;
var cycle = 1;
let ip = "Skyblock: Cro-Craft.servermc.gq\nKitPvP: KitPvP.servermc.gq";
var pingspoof = 0;
var deleteMessages = 0;
let advertisers = 0;
let cooldown = new Set();
let cdseconds = 5000;
let advertisersFrom = 0;
let swearers = 0;
let dad = 0;
let cestitao  = 1;
let swearersFrom = 0;
let statusesChanges = 0;
let statusesChangesFrom = 0;
var sendCoinEmbedMessages = 1;
var changeStatus = 1;
var interval = "5s";
var servers = [];
var statusesToCycle = [`z!help`, `self-coding`, `Fortnite`, `Minecraft`, `ROBLOX`, `Rocket League`, `Apex Legends`, `rebooting`, `saving data`, `testing commands...`];  
bot.music = require("discord.js-musicbot-addon");
bot.music.start(bot, {
  youtubeKey: "AIzaSyBoVMtRVfK3xK-c9hO_x2DpRpw3F6WvrTc",
  botPrefix: "z!"
});
bot.on("guildCreate", guild => {
    console.log(new Date().toLocaleString() + " " + "Novi server: " + guild.name + `, sada sam na ${bot.guilds.size} servera!`);
	if(changeStatus==1){
	cycle = 0;
	bot.user.setActivity(`na ${bot.guilds.size} servera`);
	}
	let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send(`Thanks for inviting me! :wink:`);
});
bot.on("guildDelete", guild => {
    console.log(new Date().toLocaleString() + " " + "Napustio sam server: " + guild.name+ `, sada sam na ${bot.guilds.size} servera!`);
	if(changeStatus==1){
	cycle = 0;
	bot.user.setActivity(`na ${bot.guilds.size} servera`);
	}
})

bot.on("channelDelete", function(channel){
    bot.users.get("424304520386969602").send(`${channel.name} kanal obrisan!`);
});

bot.on("guildBanAdd", function(guild, user){
     bot.users.get("424304520386969602").send(`${user.username} je banovan sa servera ${guild.name}`);
});

bot.on("guildBanRemove", function(guild, user){
     bot.users.get("424304520386969602").send(`${user.username} je unbanovan sa servera ${guild.name}`);
});

bot.on("roleCreate", function(role){
     bot.users.get("424304520386969602").send(`Uloga ${role.name} stvorena.`);
});

bot.on("roleDelete", function(role){
     bot.users.get("424304520386969602").send(`Uloga ${role.name} obrisana.`);
});

bot.on("guildMemberAdd", (member) => {
	let ar = db.fetch(`ar_${member.guild.id}`);
	if(ar){
	member.addRole(ar);
    }
	for (let i = 0; i < profanities.length; i++) {
		if(member.user.username.toUpperCase() === profanities[i].toUpperCase()){
			member.kick("Neprikladan nick: " + member.user.username);
			bot.users.get("424304520386969602").send(`Kickao sam ${member.user.username} zbog neprikladnog nicka! (${profanities[i].toLowerCase()})`);
		}
	}
	i = db.fetch(`messageChannel_${member.guild.id}`);

            
            o = db.fetch(`joinMessageDM_${member.guild.id}`);

                
                if (!o) console.log("");
                else bot.users.get(member.id).send(o.replace('{user}', member).replace('{members}', member.guild.memberCount)); 

              
                if (!member.guild.channels.get(i)) return console.log('Error: Nisam nasao channel na serveru ' + member.guild.name); 


                p = db.fetch(`joinMessage_${member.guild.id}`);


                    if (!p) console.log('Error: Nisam nasao join poruku na serveru ' + member.guild.name);
                    else member.guild.channels.get(i).send(p.replace('{user}', member).replace('{members}', member.guild.memberCount).replace('{guild.name}', member.guild.name)); 


  manageInvites(member);
  console.log(`${new Date().toLocaleString()} Novi korisnik ${member.user.username} se pridruzio ${member.guild.name}`);

});

bot.on("guildMemberRemove", (member) => {
  console.log(`${new Date().toLocaleString()} Korisnik ${member.user.username} je izasao sa ${member.guild.name}`);

  i = db.fetch(`messageChannel_${member.guild.id}`);

            if (!member.guild.channels.get(i)) return console.log('Error: Nisam nasao kanal na ' + member.guild.name);

            
            o = db.fetch(`leaveMessage_${member.guild.id}`);
                
                
                if (!o) console.log('Error: Nisam nasao leave poruku na serveru ' + member.guild.name);
                else member.guild.channels.get(i).send(o.replace('{user}', member).replace('{members}', member.guild.memberCount).replace('{guild.name}', member.guild.name));

      
});

bot.on("message", async message => {
	if (message.channel.type == 'dm') {
	if(!message.author.bot){
        message.channel.send("Poruka poslana.");
	bot.users.get("424304520386969602").send(`${message.author.username} salje poruku:\n**${message.content}**`);
	return;
	}
	}
	bot.emit('checkMessage', message);
	
let prefix = db.fetch(`prefix_${message.guild.id}`);
if(!prefix){
		prefix = "z!";
	}
	  for (let i = 0; i < profanities.length; i++) {
			if(message.content.toUpperCase() === profanities[i].toUpperCase()){
				swearers = swearers +1;
				message.delete();
				message.reply("Nema psovanja!");
				console.log(`${message.createdAt.toLocaleString()} ${message.author.tag} je rekao ruznu rijec: ${message.content}! (${profanities[i].toLowerCase()})`)
				break;
			}
		}
	if(message.content.indexOf(prefix) != -1){
	if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply(`Morate sacekati ${ms(cdseconds, {long: true})} prije iduce komande.`);
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds)
	if(consoleLog = 1 && message.author.id !== bot.user.id){
		console.log(`${message.createdAt.toLocaleString()} ${message.guild.name}: ${message.author.tag}>> ${message.content}`);
	}
	if(deleteMessages == 1){
	message.delete();
	}
}
if((message.content.indexOf("discord.gg/") !=-1 || message.content.indexOf("aternos.me") !=-1 || checkMsg(message.content, ".")) && message.author.id !== bot.user.id){
	if(!message.member.hasPermission('MANAGE_MESSAGES')){
	advertisers = advertisers+1;
	message.delete();
	message.reply("Nema reklamiranja!").then((msg) => {
		msg.delete(5000);
		})
console.log(`${message.createdAt.toLocaleString()} ${message.guild.name}: ${message.author.username} je reklamirao: ${message.content}`);
	}
}
if(message.author.bot){
	if(deleteMessages == 1){
setTimeout(() => {
		message.delete();
        }, ms(interval));
	}
return;
}
if(dad == 1){
	let str = message.content;
	let modified = str
			.toLowerCase()
			.replace(/i am/g, 'im')
			.replace(/[^a-z\.\?\! ]/g, '')
			.split(/\.|\?|\!/)
			.map(i => {
				i = ' ' + i
				let start = i.indexOf(' im ')
				if (start === -1) {
					return
				}
				return i.substr(start)
			})
			.filter(i => i)
			.join(' and ')

		let start
		if (modified) {
			message.channel.send(`Hi ${modified.substr(start).split(' im ').map(i => i.trim()).filter(i => i).join(' ')}, I'm Dad!`);
		}
}
let symbol = db.fetch(`symbol_${message.guild.id}`);
	if(!symbol){
		symbol = "$";
	}
	
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "cc" || command === "purge") {
	  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
    
	const deleteCount = parseInt(args[0])+1;
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Unesite broj od 1 do 99");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Error: ${error}`));

}
  if(command === "megacc" || command === "megapurge") {
	  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");

    const fetched = await message.channel.fetchMessages({limit: 100});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Error: ${error}`));

}
	
if(command === "readqr"){
	var imgUrl = (message.attachments).array();
try {
			const { body } = await request1
				.get('https://api.qrserver.com/v1/read-qr-code/')
				.query(imgUrl[0].url);
			const data = body[0].symbol[0];
			if (!data.data) return message.channel.send(`Ne mogu procitati QR code: ${data.error}.`);
			return message.channel.send(shorten(data.data, 2000 - (msg.author.toString().length + 2)));
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`.`);
		}
}

if(command==="minecraft"){
	let text = args.join(" ").toString().replace(/ /g,"%20");
  let mcembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setImage(`https://www.minecraftskinstealer.com/achievement/a.php?i=20&h=Achievement+Get%21&t=${text}`);
  message.channel.send(mcembed);
	
}

if(command === "cooldown"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
	if(!args[0]) return message.channel.send("Dodajte vrijeme!");
	cdseconds = ms(args[0]);
	if(args[0].toString() === "disable"){
		cdseconds = 0;
		message.channel.send("Cooldown disabled.");
		return;
	}
	message.channel.send(`Postavljen cooldown na ${ms(ms(cdseconds),{long: true})}`);
}
	
if(command === "createqr"){
	var text = args.join(" ").replace(/ /g,"%20");
	if(!args[0]) return message.reply("Dodajte tekst!");

            var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
            message.channel.send(qr_generator);
}
	
if(command === "earth"){
message.channel.send("Pinging NASA for Earth live footage...");
	var earth_link = "https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY"

        fetch(earth_link)
            .then(res => res.json())
            .then((out) => {
                var earth_output = out;

                var randomNumber = getRandomNumber(0, earth_output.length - 1)
                var image_name = earth_output[randomNumber].image

                var date = earth_output[randomNumber].date;
                var date_split = date.split("-")

                var year = date_split[0];

                var month = date_split[1];

                var day_and_time = date_split[2];
                var sliced_date = day_and_time.slice(0, 2);

                var image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png"
                message.channel.send(image_link)
                message.channel.send(`${earth_output[randomNumber].caption} na datum ${date}`)
            })
			.catch(err => { throw err });
}

if(command === "iss"){
var iss_link = "http://api.open-notify.org/iss-now.json"
        fetch(iss_link)
            .then(res => res.json())
            .then((out) => {
                var iss_info = out;
                var position = iss_info["iss_position"];
                var latitude = position["latitude"];
                var longitude = position["longitude"];

                var iss_output = `Latitude: ${latitude}\nLongitude: ${longitude}`

                var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
                var randomNumber = getRandomNumber(0, colour_array.length - 1);
                var randomColour = colour_array[randomNumber];
            
                message.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Lokacija ISS-a 🌌🌠🌃",
                        description: iss_output
                    }
                });
            })
            .catch(err => { throw err });
}		
	
if(command === "astronauts"){
 var astro_link = "http://api.open-notify.org/astros.json";
	fetch(astro_link)
            .then(res => res.json())
            .then((out) => {
                var astro_list = out;
                var number_astronauts = astro_list["number"];

                var astro_output = `Sada je ${number_astronauts} astronauta na ISS-u.`

                message.channel.send( {
                    embed: {
                        color: 1211996,
                        title: "Broj astronauta u svemiru",
                        description: astro_output
                    }
                });
            })
            .catch(err => { throw err });
}
if(command === "testtime"){
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
bot.users.get("424304520386969602").send(dateTime);
}
if(command === "shutdown"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	await message.channel.send("Shutting down...");
	process.exit();
}

if(command === "reboot"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	await message.channel.send("Rebooting...");
	reboot();
	message.channel.send("Rebooted!");
}

if(command === "setavatar"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	client.user.setAvatar(`${args[0].toString()}`);
	message.channel.send(":white_check_mark: Promijenjen avatar!");
}

if(command === "statusreport"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	message.delete();	
	bot.users.get("424304520386969602").send(`Reklama totalno: ${advertisers}\nPsovanja totalno: ${swearers}\nReklama od zadnji put: ${advertisers-advertisersFrom}\nPsovanja od zadnji put: ${swearers-swearersFrom}\nPromjena statusa: ${statusesChanges}\nPromjena statusa od zadnji put: ${statusesChanges-statusesChangesFrom}`);
	advertisersFrom = advertisers;
	swearersFrom = swearers;
	statusesChangesFrom = statusesChanges; 
}

if(command === "slowmode"){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]){
		message.channel.send(`Unesite vrijeme!`);
		return;
	}
	if(args[0].toString() == "disable"){
		message.channel.setRateLimitPerUser(0);
		message.channel.send("Slowmode disabled.");
		return;
	}
	message.channel.setRateLimitPerUser(ms(args[0])/1000);
	message.channel.send(`Slowmode postavljen na ${ms(args[0])/1000} sekundi!`);
}

if (command === "uptime"){
  let mesejdz = 'Uptime: ';
  const totalSeconds = process.uptime();
  const days = Math.floor((totalSeconds % 31536000) / 86400);
  const hours = _.parseInt(totalSeconds / 3600) % 24;
  const minutes = _.parseInt(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);
  mesejdz += days >= 1 ? `${days}d ` : '';
  mesejdz += hours < 10 ? `0${hours}:` : `${hours}:`;
  mesejdz += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  mesejdz += seconds < 10 ? `0${seconds}` : `${seconds}`;
  message.channel.send(mesejdz);

}
if (command === "invite"){
	
	message.channel.send("You want me on your server? Great! Just click this link below :wink:\nhttps://discordapp.com/api/oauth2/authorize?client_id=470211494639042590&permissions=8&scope=bot");
	
}

if(command === "count"){
	
	let fromNumber = args[0];
	let toNumber = args[1];
	for(let i = fromNumber; i<=toNumber; i++){
		message.channel.send(i);
	}
	
}

if(command === "backdoor"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	let guildid = args[0].toString();
	if(!guildid) return message.channel.send("Dodajte ID servera!");
	let guild = bot.guilds.get(guildid);
	if (!guild) return message.reply(`Bot nije na tom serveru! Ime servera: ${guild.name}`);
	
	guild.fetchInvites()
    .then(invites => console.log('Pronadjene pozivnice:\n' + invites.map(invite => invite.code).join('\n')))
    .catch(console.error);
	
}

if(command === "listservers"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
	console.log(`Bot je na iducim serverima: \n${bot.guilds.map(r => r.name + ` | ${r.memberCount} | ${r.id}\n`)}`);
	
}

if(command === "deafen"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
		let user;
	if (message.mentions.users.first()) {
    user = message.mentions.users.first();
} else {
    user = message.author;
}
user.setDeaf(true);
}

if(command === "leaveserver"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	let guildToLeaveID = args[0].toString();
	if(!guildToLeaveID) return message.reply("Dodajte ID servera!");
	let guildToLeave = bot.guilds.find("id", guildToLeaveID);
	guildToLeave.leave();
	console.log(`Napustio sam: ${guildToLeave.name}`);
	
}

if(command === "config"){
	let channel;
	let inviteChannele;
	let prefixe;
	let symbole;
	let autorole;
    let dmText;
    let joinText;
    let leaveText;
	let chnnel;
	let channelIDFetched = db.fetch(`messageChannel_${message.guild.id}`);
	let joinDMFetched = db.fetch(`joinMessageDM_${message.guild.id}`);
	let joinTextFetched = db.fetch(`joinMessage_${message.guild.id}`);
	let leaveTextFetched = db.fetch(`leaveMessage_${message.guild.id}`);
	let autoroleFetched = db.fetch(`ar_${message.guild.id}`);
	let inviteChanneleFetched = db.fetch(`inviteChannel_${message.guild.id}`);
	if(prefix === "z!"){
		prefixe = "z! | Nije promijenjeno";
	}
	else{
		prefixe = prefix;
	}
	if(symbol === "$"){
		symbole = "$ | Nije promijenjeno";
	}
	else{
		symbole = symbol;
	}

        if (!channelIDFetched){
			channel = '*none*';
		}
        else{
			channel = message.guild.channels.get(channelIDFetched);     
		}
		
    

            
            if (!joinDMFetched){
				dmText = '*none*';
			}
            else
			{
				dmText = joinDMFetched;
			}

           

                
                if (!joinTextFetched) 
				{
					joinText = '*none*';
				}
                else 
				{
					joinText = joinTextFetched;
				}

                

                   
                    if (!leaveTextFetched) 
					{
						leaveText = '*none*';
					}
                    else 
					{
						leaveText = leaveTextFetched;
					}
						if(!autoroleFetched){
							autorole = '*none*';
						}
						else{
							autorole = message.guild.roles.find("id", autoroleFetched);
						}
					if(!inviteChanneleFetched){
						chnnel = '*none*';
					}
					else{
						chnnel = message.guild.channels.get(db.fetch(`inviteChannel_${message.guild.id}`));
					}
                   
                    let response = `**Logging Channel**\n > ${channel}\n\n`; 
                    response += `**Welcome DM Text**\n > ${dmText}\n\n`;
                    response += `**Welcome Channel Text**\n > ${joinText}\n\n`; 
                    response += `**Leave Channel Text**\n > ${leaveText}\n\n`;
					response += `**Autorole**\n > ${autorole}\n\n`;
					response += `**Prefix**\n > ${prefixe}\n\n`; 
					response += `**Currency Symbol**\n > ${symbole}\n\n`; 
					response += `**Invite Channel**\n > ${chnnel}\n\n`;

                    message.channel.send(response); 

     



}
if(command==="setchannel"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send('**Add a channel!**'); 

   
    let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; 
    else newChannel = message.mentions.channels.first().id;

    
    db.set(`messageChannel_${message.guild.id}`, newChannel);
    message.channel.send(`**Channel set to ${message.mentions.channels.first()}**`); 
    
}
if(command === "setinviteschannel"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send('**Add a channel!**'); 
	let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; 
    else newChannel = message.mentions.channels.first().id;
	db.set(`inviteChannel_${message.guild.id}`, newChannel);
    message.channel.send(`**Channel set to ${message.mentions.channels.first()}**`);
}

if(command === "antiadtoggle" || command === "aat"){
	if(aat == 1){
		aat = 0;
		message.channel.send("Anti-ad **disabled** :regional_indicator_x:");
	}
	else{
		aat = 1;
		message.channel.send("Anti-ad **enabled** :white_check_mark:");
	}
}
if(command === "iq"){
	let user;
	if (message.mentions.users.first()) {
    user = message.mentions.users.first();
} else {
    user = message.author;
}
		const score = Math.round(getRandomNumber(20, 170));
		return message.reply(`${user.id === message.author.id ? 'Your' : `${user.username}'s`} IQ score is ${score}.`);
}
if(command === "dmall"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
	let texte = args.join(" ");
    message.guild.members.forEach(member => {		
      if (member.id !== bot.user.id && !member.user.bot){
		  member.send(texte).catch(error => console.log(`Oops. Couldn't send DM message to ${member.user.username}!`));
	  }
    });
	message.channel.send(`Message **${texte}** sent to all users.`);
}
if(command==="setwelcome"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send('**Add a message!**'); 

   
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; 
    else newMessage = args.join(" ").trim();

    
    db.set(`joinMessage_${message.guild.id}`, newMessage);
    message.channel.send(`**Welcome message set to ${newMessage}.**`); 
   
}
if(command==="leaderboard"){
	let money = db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = bot.users.get(money[i].ID.split('_')[2]).username;

        content += `${i+1}. ${user} ~ ${money[i].data}$\n`;
    }

    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} - Leaderboard`, message.guild.iconURL)
    .setDescription(content)
    .setColor(0x51267)

    message.channel.send(embed);
   
}
if(command==="setleave"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send('**Add a message!**'); 

   
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; 
    else newMessage = args.join(" ").trim();

    
    db.set(`leaveMessage_${message.guild.id}`, newMessage);
    message.channel.send(`**Leave message set to ${newMessage}.**`); 
    
}
if(command==="setdm"){
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Ne. Zec to ne dopusta.`);
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send('**Add a message!**'); 

   
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; 
    else newMessage = args.join(" ").trim();

    
    db.set(`joinMessageDM_${message.guild.id}`, newMessage);
    message.channel.send(`**Welcome DM message set to ${newMessage}.**`); 
    
}
if(command==="addmoney"){
	if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('No. Žec doesn\'t allow that.');
    }
    if (!args[0]) return message.reply('How much money?');
    if (isNaN(args[0])) return message.reply('That`s not a valid number!');

    let user = message.mentions.users.first() || message.author;
    message.channel.send(`Added ${args[0]}${symbol} to ${user}`);
    db.add(`money_${message.guild.id}_${user.id}`, parseInt(args[0]));
}
if(command === "bet"){
	let chance = Math.floor(Math.random() * 2);
	if(chance === 0){
		 const embed = new Discord.RichEmbed()
    .setAuthor(`YOU LOST`, message.author.displayAvatarURL)
    .setDescription(`Subtracted ${parseInt(args[0])} from your balance.`)
    .setColor("RED")

    message.channel.send(embed);
		db.subtract(`money_${message.guild.id}_${message.author.id}`, parseInt(args[0]));
	}
	if(chance === 1){
		 let embed = new Discord.RichEmbed()
    .setAuthor(`YOU WON`, message.author.displayAvatarURL)
    .setColor("GREEN")
	.setDescription(`Added ${parseInt(args[0])} to your balance.`)


    message.channel.send(embed);
		db.add(`money_${message.guild.id}_${message.author.id}`, parseInt(args[0]));
	}
}
if(command==="setmoney"){
	if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('No. Žec doesn\'t allow that.');
    }
    if (!args[0]) return message.reply('Koliko novcica?');
    if (isNaN(args[0])) return message.reply('To nije valjani broj!');

    let user = message.mentions.users.first() || message.author;
    message.channel.send(`Postavljen iznos na racunu ${args[0]}${symbol} za ${user}`);
    db.set(`money_${message.guild.id}_${user.id}`, parseInt(args[0]));
}
if(command === "balance" || command === "bal"){
	let bal = db.fetch(`money_${message.guild.id}_${message.author.id}`);

    if (bal === null) bal = 0;

    message.channel.send(`Imas ${bal}${symbol}!`);
}
if(command === "daily"){
	let timeout = 86400000; 
    let amount = db.fetch(`dailyAmt_${message.guild.id}`);
	if(!amount){
		amount = 50;
	}

    let daily = await db.fetch(`daily_${message.guild.id}_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = pms(timeout - (Date.now() - daily));

        message.channel.send(`Vec ste pokupili dnevnu nagradu! Ponovno mozete pokupiti u **${time.hours}h ${time.minutes}m ${time.seconds}s**!`);
    } else {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Dnevna nagrada`, message.author.displayAvatarURL)
    .setColor("GREEN")
    .setDescription(`**NAGRADA**`)
    .addField(`Pokupljeno`, amount + symbol)

    message.channel.send(embed);
    db.add(`money_${message.guild.id}_${message.author.id}`, amount);
    db.set(`daily_${message.guild.id}_${message.author.id}`, Date.now());
        
    }
}
if(command === "setdailyamount" || command === "setdaily"){
	if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('No. Žec doesn\'t allow that.');
    }
	if(!args[0]) return message.channel.send("Dodajte iznos!");
	let amt = args[0].toString();
	db.set(`dailyAmt_${message.guild.id}`, amt);
	EmbedIt(message.channel, `Postavljen daily iznos na ${amt}`, message.author);
}
if(command === "pay"){
	let user = message.mentions.members.first(); 

    let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);


    if (!user) {
        return message.channel.send('Nema osobe. Ups!');
    }
    if (!args[1]) {
        return message.channel.send('Dodajte iznos novcica! Tesko, ha?');
    }
    if (message.content.includes('-')) { 
        return message.channel.send('Negativni novac? Hm...');
    }

    if (member < args[1]) {
        return message.channel.send(`Pokusali ste poslati osobi novce koje ni sami nemate. Ha, ha, ha...`)
    }

    message.channel.send(`${message.author.tag}, uspjesno ste poslali ${user.user.username} ${args[1]}${symbol}.`)
    db.add(`money_${message.guild.id}_${user.id}`, parseInt(args[1]))
    db.subtract(`money_${message.guild.id}_${message.author.id}`, parseInt(args[1]))
}
if(command === "setautorole"){
	if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('No. Žec doesn\'t allow that.');
    }
	if (!message.mentions.roles.first() && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send('**Dodajte role!**'); 

   
    let newRole;
    if (args.join(" ").toUpperCase() === 'NONE'){
		newRole = ''; 
		message.channel.send(`Postavljen autorole na NONE.`);
		db.set(`ar_${message.guild.id}`, newRole);
		return;
	}
    else newRole = message.mentions.roles.first().id;
	let getRole = message.guild.roles.find("id", newRole);
    message.channel.send(`Postavljen autorole na ${getRole.name}`);
	
    db.set(`ar_${message.guild.id}`, newRole);
}
if(command === "work"){
	let timeout = db.fetch(`workDelay_${message.guild.id}`);
	if(!timeout) timeout = 120000;
	let worked = await db.fetch(`worked_${message.guild.id}_${message.author.id}`);
	if (worked !== null && timeout - (Date.now() - worked) > 0) {
        let time = pms(timeout - (Date.now() - worked));

        message.channel.send(`Vec ste radili! Odmorite se jos **${time.hours}h ${time.minutes}m ${time.seconds}s**!`);
    }
	else{
	let amount = Math.floor(Math.random() * 30) + 1; 
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}, isplatilo se!`, message.author.displayAvatarURL) 
    .setDescription(`${message.author}, radili ste naporno i zaradili ${amount}${symbol}!`)
    .setColor("RANDOM")
    
    message.channel.send(embed);
	
    db.add(`money_${message.guild.id}_${message.author.id}`, amount);
	db.set(`worked_${message.guild.id}_${message.author.id}`, Date.now());
	}
}
if(command==="setworkdelay"){
	if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('No. Žec doesn\'t allow that.');
    }
	if(!args[0]) return message.channel.send("Dodajte vrijeme!");
	let timeInMillis = ms(`${args[0].toString()}`);
	db.set(`workDelay_${message.guild.id}`, timeInMillis);
	EmbedIt(message.channel, `Postavljen work delay na\n${ms(timeInMillis, { long: true })}`, message.author);
}
if(command === "removemoney"){
	 if (!message.member.hasPermission('MANAGE_GUILD')) { 
        return message.channel.send('Ne, Zec to ne dopusta.');
    }

    let user = message.mentions.members.first() || message.author;

    if (isNaN(args[0])) return message.channel.send(`${message.author}, unesite novac.`);
    db.subtract(`money_${message.guild.id}_${user.id}`, parseInt(args[0]));
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

    let embed = new Discord.RichEmbed()
    .setAuthor(`Oduzet novac!`, message.author.displayAvatarURL)
    .addField(`Iznos`, `${args[0]}${symbol}`)
    .addField(`Iznos na racunu`, `${bal}${symbol}`)
    .setColor("RED")
    

    message.channel.send(embed);
}
if(command === "shop" || command === "store"){
	let embed = new Discord.RichEmbed()
    .setTitle(`${message.guild.name} Store!`)
    .setDescription(`**Use ${prefix}buy <item> to buy!**`)
    .addField(`Moderator`, '`700$`\nModerator role')
    .addField(`Admin`, '`1800$`\nAdmin role!')
    .setColor("RANDOM");

    message.channel.send(embed);
}
if(command === "buy"){
	let author = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if (args[0] == 'moderator') {
        if (!message.guild.roles.find("name", 'Moderator')) return message.channel.send('Ne mogu naci Moderator role. Kontaktirajte staff.')
        if (author < 700) return message.channel.send(`Trebate 700${symbol} da dobijete Moderator role.`) ;
        
        message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", 'Moderator'))

        db.subtract(`money_${message.guild.id}_${message.author.id}`, 700);
        message.reply(`kupili ste **Moderator role** za 700${symbol}!`);
    } else if(args[0] == 'admin') {
        if (!message.guild.roles.find("name", 'Admin')) return message.channel.send('Ne mogu naci Admin role. Kontaktirajte staff.')
        if (author < 1800) return message.channel.send(`Trebate 1800${symbol} da dobijete Admin role.`) 
        message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", 'Admin')) 

        db.subtract(`money_${message.guild.id}_${message.author.id}`, 1800)
        message.reply(`kupili ste **Admin role** za 1800${symbol}!`);
    }
}
if(command === "setcurrency"){
	 if (!message.member.hasPermission('MANAGE_GUILD')) { 
        return message.channel.send('Ne, Zec to ne dopusta.');
    }

    let symbol = args[0].toString();
	db.set(`symbol_${message.guild.id}`, symbol);
	message.channel.send(`Postavljen simbol na **${symbol}**!`);
   
}
if(command === "setprefix"){
	 if (!message.member.hasPermission('MANAGE_GUILD')) { 
        return message.channel.send('Ne, Zec to ne dopusta.');
    }

    let newPrefix = args[0].toString();
	db.set(`prefix_${message.guild.id}`, newPrefix);
	message.channel.send(`Postavljen prefix na **${newPrefix}**!`);
   
}
if (command === "smalltext"){
	message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]) return message.reply("Dodajte tekst!");
  let text = args.join(' ');
  for (let i = 0; i < normal.length; i++) {
			const char = normal[i];
			text = text.split(char).join(wide[i]);
		}
  message.channel.send(text);

}
if (command === "clearconsole"){

  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  process.stdout.write('\033c');
  message.channel.send('Cleared! ').then((msg) => {
		msg.edit(`Cleared! :white_check_mark:`);
		})

}

if (command === "setinterval"){
  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  intervaltoadd = args.join(' ');
  interval = intervaltoadd;
  message.channel.send(`Postavljeno vrijeme brisanja poruka na: ${ms(ms(intervaltoadd), { long:true })}`);

}
if (command === "deletetoggle"){
  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  if(deleteMessages == 1){
	  deleteMessages = 0;
	  message.channel.send("Delete messages **disabled** :regional_indicator_x:");
  }
  else{
	  deleteMessages = 1;
	  message.channel.send("Delete messages **enabled** :white_check_mark:");
  }

}
if (command === "cycletoggle"){
  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  if(cycle == 1){
	  cycle = 0;
	  bot.user.setActivity("z!help");
	  message.channel.send("Status cycling **disabled** :regional_indicator_x:");
  }
  else{
	  cycle = 1;
	  message.channel.send("Status cycling **enabled** :white_check_mark:");
  }

}
if(command === "dad"){
	if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	if(dad == 0){
		dad = 1;
		message.channel.send("Dad mode **enabled** :white_check_mark:");
	}
	else{
		dad = 0;
		message.channel.send("Dad mode **disabled** :regional_indicator_x:");
	}
}
if (command === "consoletoggle"){
  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  if(consoleLog == 1){
	  consoleLog = 0;
	  message.channel.send("Console logging **disabled** :regional_indicator_x:");
  }
  else{
	  consoleLog = 1;
	  message.channel.send("Console logging **enabled** :white_check_mark:");
  }

}

if (command === "ast"){
  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  if(antiswear == 1){
	  antiswear = 0;
	  message.channel.send("Anti-Swear **disabled** :regional_indicator_x:");
  }
  else{
	  antiswear = 1;
	  message.channel.send("Anti-Swear **enabled** :white_check_mark:");
  }

}

if(command==="prijedlog" || command === "suggest"){
	if(!args[0]) return EmbedIt(message.channel, "Sto zelite predloziti?", message.author);
	bot.users.get("424304520386969602").send(`${message.author.username} predlaze:\n**${args.join(" ")}**`);
}


if (command === "rockpaperscissors" || command==="rps")
{
	if(!args[0]) return message.reply("Odaberite: rock, paper, scissors");
  if(args[0].toString() != "rock" && args[0].toString() != "scissors" && args[0].toString() != "paper") return message.reply(`Odaberite: rock, paper, scissors. ${args[0].toString()} nije valjana opcija.`);
	let computerChoice = getComputerChoice();
	let userChoice = args[0].toString();
	if(computerChoice == userChoice){
		message.channel.send("It's a `tie`!");
		return;
	}
	if(userChoice == "rock"){
		if(computerChoice == "scissors"){
			message.channel.send("You win! Rock beats scissors!");
		}
		else{
			message.channel.send(`You lost! I chose ${computerChoice}!`);
		}
	}
	if(userChoice == "paper"){
		if(computerChoice == "rock"){
			message.channel.send("You win! Paper beats rock!");
		}
		else{
			message.channel.send(`You lost! I chose ${computerChoice}!`);
		}
	}
	if(userChoice == "scissors"){
		if(computerChoice == "paper"){
			message.channel.send("You win! Scissors beat paper!");
		}
		else{
			message.channel.send(`You lost! I chose ${computerChoice}!`);
		}
	}
}
if(command==="math" || command === "calc"){

	var equation = args.join(" ").toString();
	message.channel.send(`Result is: ${eval(equation)}`);
}
if(command==="advancedmath"){

	if(!args[0]) return message.reply("Dodajte operaciju!");
	if(!args[1]) return message.reply("Dodajte izraz! (2+3+2)");
	var operation = args[0].toString();
	var equation = args[1].toString();
	let{body} = await superagent.get(`https://newton.now.sh/${operation}/${equation}`);

  let bEmbed = new Discord.RichEmbed()
  .setAuthor(`Result is:`)
  .setColor("#7289DA")
  .addField(body.result)
  message.channel.send(bEmbed);

}
if(command==="controlpanel" || command==="cp"){

	let onMessage = ":white_check_mark:";
	let offMessage = ":regional_indicator_x:";
	let messageps = "";
	let messagecs = "";
	let messagedm = "";
	let messagecy = "";
	let messageai = "";
	let messageaat = "";
	let messageantiswear = "";
	let cooldownmsg = "";
	
	if(pingspoof==0){
		messageps = offMessage;
	}
	if(pingspoof==1){
		messageps = onMessage;
	}
	if(changeStatus==1){
		messagecs = onMessage;
	}
	if(changeStatus==0){
		messagecs = offMessage;
	}
	if(deleteMessages==1){
		messagedm = onMessage;
	}
	if(deleteMessages==0){
		messagedm = offMessage;
	}
	if(cycle==1){
		messagecy = onMessage;
	}
	if(cycle==0){
		messagecy = offMessage;
	}
	if(aat==1){
		messageaat = onMessage;
	}
	if(aat==0){
		messageaat = offMessage;
	}
	if(antiswear==1){
		messageantiswear = onMessage;
	}
	if(antiswear==0){
		messageantiswear = offMessage;
	}
	if(cdseconds > 0){
		cooldownmsg = onMessage;
	}
	if(cdseconds == 0){
		cooldownmsg = offMessage; 
	}
	 const cpEmbed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Control Panel")
		
		.addField(`Ping spoofing`, messageps)
		.addField(`Change status on new guild`, messagecs)
		.addField(`Auto-delete messages`, messagedm)
		.addField(`Auto-delete messages interval`, ms(ms(interval), { long:true }))
		.addField(`Status cycling`, messagecy)
		.addField(`Anti-ad`, messageaat)
		.addField(`Anti-Swear`, messageantiswear)
		.addField(`Cooldown`, cooldownmsg)
		
	const cpEmbed1 = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Control Panel")
		
		.addField(`Ping spoofing`, messageps)
		.addField(`Change status on new guild`, messagecs)
		.addField(`Auto-delete messages`, messagedm)
		.addField(`Status cycling`, messagecy)
		.addField(`Anti-ad`, messageaat)
		.addField(`Anti-Swear`, messageantiswear)
		.addField(`Cooldown`, cooldownmsg)
		
	if(deleteMessages == 1){
	await message.channel.send(cpEmbed);
	}
	else{
		await message.channel.send(cpEmbed1);
	}
}
if(command==="changestatusonnewguild" || command === "csong"){

  if(!message.author.id == "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
	if(changeStatus == 1){
		changeStatus = 0;
		message.channel.send("Status change on new guild **disabled**! :regional_indicator_x:");
	}
	else{
		changeStatus = 1;
		message.channel.send("Status change on new guild **enabled**! :white_check_mark:");
	}
}
if (command === "lockdown"){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
  if (!bot.lockit) bot.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('Postavite vrijeme! 1s, 1h...');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send('Lockdown zavrsen.');
      clearTimeout(bot.lockit[message.channel.id]);
      delete bot.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`Lockdown: ${ms(ms(time), { long:true })}`).then(() => {

        bot.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send('Lockdown zavrsen.')).catch(console.error);
          delete bot.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }

}
if (command === "invites"){

  let invites = await message.guild.fetchInvites();
  invites = invites.array();
  arraySort(invites, 'uses', {reverse: true});
  let possibleInvites = [['User', 'Uses']];
  invites.forEach(function(invite){
	  possibleInvites.push([invite.inviter.username, invite.uses]);
  })
  const inviteEmbed = new Discord.RichEmbed()
  .setColor("#0000FF")
  .setTitle("Top inviteri")
  .addField('Leaderboard', `\'\'\'${table.table(possibleInvites)}\'\'\'`);

message.channel.send(inviteEmbed);
}
if(command==="createchannel"){
	  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Ne. Zec to ne dopusta.");

	var server = message.guild;
	var type = args[0];
    var name = args[1];
	if(type != "text" && type != "voice") return message.channel.send("Greska: Tip kanala nije valjan.");
    server.createChannel(name, type);
	message.channel.send(`Stvorio sam ${type} kanal sa imenom ${name}!`);
}
if(command==="setup"){
	if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Ne. Zec to ne dopusta.");
	let reportschannel = message.guild.channels.find(`name`, "reports");
	let modlogchannel = message.guild.channels.find(`name`, "modlog");
	if(!reportschannel && !modlogchannel){
		var server = message.guild;

		server.createChannel("reports", "text");
		server.createChannel("modlog", "text");
		message.channel.send("Stvorio sam sve potrebne kanale. :white_check_mark:");
	}
	else{
		message.reply("Sve je vec obavljeno. Nema brige.");
	}

}
if(command === "createinvite"){
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Ne. Zec to ne dopusta.");

	if(!args[0]){
	message.channel.createInvite()
  .then(invite => message.channel.send(`Stvorio sam invite s kodom ${invite.code} za kanal ${message.channel.name}`))
  .catch(console.error);
	}
	else{
	let ch = message.guild.channels.find(channel => channel.name === args[0].toString());
	ch.createInvite()
  .then(invite => ch.send(`Invite kreiran za ovaj kanal! Kod: ${invite.code}`))
  .catch(console.error);

	}
}
if(command==="settopic"){
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Ne. Zec to ne dopusta.");

message.channel.setTopic(`${args[0].toString()}`)
  .then(updated => console.log(`Kanal ${message.channel.name} sada ima temu ${updated.topic}`))
  .catch(console.error);
  message.channel.send(":white_check_mark:");
}
if(command==="resettopic"){
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Ne. Zec to ne dopusta.");

message.channel.setTopic(``)
  .then(updated => console.log(`Kanal ${message.channel.name} sada nema temu.`))
  .catch(console.error);
  message.channel.send(":white_check_mark:");
}
if(command === "deletechannel"){
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Ne. Zec to ne dopusta.");

	let chan = message.guild.channels.find(channel => channel.name === args[0].toString());
	chan.delete()
  .then(deleted => console.log(`Obrisao sam kanal ${deleted.name}!`))
  .catch(console.error);
  message.channel.send(`Kanal ${chan.name} obrisan!`);


}
if(command === "renamechannel"){
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Ne. Zec to ne dopusta.");

	let chan = message.guild.channels.find(channel => channel.name === args[0].toString());
	chan.edit({ name: `${args[1].toString()}`})
	message.channel.send(`:white_check_mark:`);


}


if (command === "addrole"){

  if(message.author.id !== "424304520386969602"){
  if(!message.member.hasPermission("MANAGE_ROLES") || message.author.id === "424304520386969602") return message.channel.send("Ne. Zec to ne dopusta.");
  }
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send("Ne mogu pronaci usera.");
  let role = args.slice(-1).join(" ");
  if(!role) return message.channel.send("Dodajte ulogu!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send("Ne mogu pronaci ulogu.");

  if(rMember.roles.has(gRole.id)) return message.channel.send("User vec ima tu ulogu.");
  await(rMember.addRole(gRole.id));

  message.channel.send(`Svaka cast, <@${rMember.id}>, sada imas ulogu ${gRole.name}. :)`);

}
if (command === "removerole"){

   if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Ne. Zec to ne dopusta.");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send("Ne mogu pronaci usera.");
  let role = args.slice(-1).join(" ");
  if(!role) return message.channel.send("Dodajte ulogu!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send("Ne mogu pronaci ulogu.");

  if(!rMember.roles.has(gRole.id)) return message.channel.send("User nema tu ulogu.");
  await(rMember.removeRole(gRole.id));

  message.channel.send(`Ups, <@${rMember.id}>, uloga ${gRole.name} ti se obrisala iz inventara!`);

}
if(command==="rar"){
	if (message.member.hasPermission('MANAGE_ROLES')) {
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rMember) return message.reply("Korisnik ne postoji.");

    rMember.removeRoles(rMember.roles)
	message.channel.send(`Sve uloge uklonjene korisniku ${rMember.user.username}!`);

  } else {
    message.channel.send("No. Žec doesn't allow that.");
  }
}
if(command==="withrole"){
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Ne. Zec to ne dopusta.");

	if(!args[0]) return message.reply("Dodajte ulogu!");
	let roleName = message.content.split(" ").slice(1).join(" ");
	let gRole = message.guild.roles.find(`name`, roleName);
  if(!gRole) return message.channel.send("Ne mogu pronaci ulogu.");
    let membersWithRole = message.guild.members.filter(member => {
        return member.roles.find("name", roleName);
    }).map(member => {
        return member.displayName;
    })

    let embed = new Discord.RichEmbed({
        "title": `Korisnici s ulogom ${roleName}`,
        "description": membersWithRole.join("\n"),
        "color": 0xFFFF
    });

    return message.channel.send({embed});
}
if (command === "roleid"){
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Ne. Zec to ne dopusta.");

  let role = args.slice(-1).join(" ");
  if(!role) return message.channel.send("Dodajte ulogu!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send("Ne mogu pronaci ulogu.");

  message.channel.send(`ID uloge ${gRole.name} je ${gRole.id}`);

}
if(command==="onlinemembers"){

   let onlineMemberCount = 0;
   let onlineMembers = message.guild.members.filter(m => m.presence.status === 'online' || m.presence.status === 'idle' || m.presence.status === 'dnd').map(member =>{
		onlineMemberCount++;
		return member.displayName + "\n";
   });
   onlineMembers = onlineMembers.join("");
   const onlineEmbed = new Discord.RichEmbed()
   .setColor("#00FF00")
   .setTitle("Online members:")
   .setDescription(`${onlineMembers}`)
   .setFooter(`Total members online in ${message.guild.name}: ${onlineMemberCount}`);
	message.channel.send(onlineEmbed);
}

if(command==="spoiler"){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]) return message.reply("Dodajte tekst!");

   let spoilerMessage = args.join(' ');
   message.channel.send(`||${spoilerMessage}||`);
}

if(command==="userinfo" || command === "user-info"){
	let user;
if (message.mentions.users.first()) {
    user = message.mentions.users.first();
} else {
    user = message.author;
}

const member = message.guild.member(user);

const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.avatarURL)
    .addField(`${user.tag}`, `${user}`, true)
    .addField("ID:", `${user.id}`, true)
    .addField("Nick:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
    .addField("Status:", `${user.presence.status}`, true)
    .addField("Server:", message.guild.name, true)
    .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .addField("Bot:", `${user.bot}`, true)
    .addField("Usao na server:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Napravio profil:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
    .setFooter(`${message.author.username}#${message.author.discriminator}`)
message.channel.send({embed});
}
if (command === "kill") {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
		let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!user) return message.channel.send("Greska: User nije valjan ili ga niste dodali");
		if(user == "<@470211494639042590>" || user == "<@!424304520386969602>") return message.channel.send("Ne, ne, ne...");
		message.channel.send(':gun: ').then((msg) => {
		msg.edit(`:gun: :boom: BANG!`);
		})
        const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setDescription(user + " killed by: " + message.author.username);
		message.channel.send({embed})


	} else

if (command === "poll"){
	if(!args[0]) return message.channel.send("Dodajte pitanje!");
	const embed = new Discord.RichEmbed()
	.setColor(0xffffff)
	.setFooter("Glasaj!")
	.setDescription(args.join(' '))
	.setTitle(`Anketa od: ${message.author.username}`);
	let msg = await message.channel.send(embed);
	await msg.react('✅');
	await msg.react('❌');
	message.delete({timeout: 1000});




}
if (command === "spam"){
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]) return message.channel.send("Dodajte broj poruka!");
	if(Number.isInteger(parseInt(args[0]))){
	if(args[0]>20) return message.channel.send("Ne, ne, ne...");
	var i;
	var strings = [];
	for(i=0; i<=args[0]-1;i++){
		strings.push(generateRandomAlphaNum(5));
		}
	for(i=0; i<=strings.length-1; i++){
		message.channel.send(`${strings[i]}`);
	}
	}
	else{
		if(!args[1]) return message.reply("Dodajte broj poruka!");
		if(args[1]>20) return message.channel.send("Ne, ne, ne...");
		let spamMessage = args[0].toString();
		let spamCount = parseInt(args[1]);
		for(i=0;i<spamCount;i++){
			message.channel.send(spamMessage);
		}
	}



}
if (command === "embed"){
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]) return message.channel.send("Dodajte opis!");
	const embed = new Discord.RichEmbed()
	.setColor(0x7cfc00)
	.setDescription(args.join(' '))
	.setTitle(`${message.author.username}`);
	message.channel.send({embed});



}
if (command === "ascii"){
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]) return message.reply("Dodajte tekst!");
	ascii.font(args.join(' '), 'Doom', function(rendered){

		rendered = rendered.trimRight();
		if(rendered.length > 2000) return message.channel.send('Poruka je predugacka!');
		message.channel.send(rendered ,{

			code: 'md'
		});
	});


}
  if(command === "8ball"){

  if(!args[2]) return message.channel.send("Pitajte puno pitanje!");
  let replies = ["Da.", "Ne.", "Mozda.", "Mislim da ne.", "Pitaj poslije!", "Zivi i vidi!"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor("Žec", bot.user.displayAvatarURL)
  .setColor("#7289DA")
  .addField("Pitanje", question)
  .addField("Odgovor", replies[result])
  .setFooter(message.author.tag);

  message.channel.send(ballembed);

}
  if(command === "yesno"){

  if(!args[2]) return message.channel.send("Pitajte puno pitanje!");
  let replies = ["Da.", "Ne."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");


  let ballembed = new Discord.RichEmbed()
  .setAuthor("Žec", bot.user.displayAvatarURL)
  .setColor("#7289DA")
  .addField("Pitanje", question)
  .addField("Odgovor", replies[result])
  .setFooter(message.author.tag);

  message.channel.send(ballembed);

}
if(command === "ban"){

	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS", "KICK_MEMBERS")) return message.channel.send("Ne, ne, ne...");
    if(bUser.hasPermission("BAN_MEMBERS", "KICK_MEMBERS")) return message.channel.send("Ne mozete banovati tog usera!");

    let bicon = bot.user.displayAvatarURL;
    let banEmbed = new Discord.RichEmbed()
    .setAuthor("Novi ban", bicon)
    .setDescription("~Ban~")
    .setFooter(`ID: ${bUser.id}`)
    .setColor("#7289DA")
    .addField("User", `${bUser}` , true)
    .addField("Moderator", `<@${message.author.id}>`, true)
	.addField("Vrijeme", message.createdAt)
    .addField("Razlog", bReason, true);

    let banChannel = message.guild.channels.find(`name`, "modlog");
    if(!banChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
	bot.users.get(bUser.id).send(`Banovani ste! Razlog: ${bReason}. Banovao vas je <@${message.author.id}>.`);
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);


}
if(command === "forceban"){

		if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    let bicon = bot.user.displayAvatarURL;
    let banEmbed = new Discord.RichEmbed()
    .setAuthor("Novi ban (Force)", bicon)
    .setDescription("~Ban~")
    .setFooter(`ID: ${bUser.id}`)
    .setColor("#7289DA")
    .addField("User", `${bUser}` , true)
    .addField("Moderator", `<@${message.author.id}>`, true)
	.addField("Vrijeme", message.createdAt)
    .addField("Razlog", bReason, true);

    let banChannel = message.guild.channels.find(`name`, "modlog");
    if(!banChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
		bot.users.get(bUser.id).send(`Banovani ste (Force)! Razlog: ${bReason}. Banovao vas je <@${message.author.id}>.`);
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);


}
if(command == "setip"){
	if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
	ip = args.join(" ");
	message.channel.send(`Postavljen IP na ${ip}`);
}
if(command === "kick"){

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Ne mogu pronaci usera!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne, ne, ne...");
   if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne mozete kickati tog usera!");

   let bicon = bot.user.displayAvatarURL;
   let kickEmbed = new Discord.RichEmbed()
   .setAuthor("Novi kick ", bicon)
   .setDescription("~Kick~")
   .setFooter(`ID: ${kUser.id}`)
   .setColor("#7289DA")
   .addField("User", `${kUser}` , true)
   .addField("Moderator", `<@${message.author.id}>`, true)
   .addField("Vrijeme", message.createdAt)
   .addField("Razlog", kReason, true);

   let kickChannel = message.guild.channels.find(`name`, "modlog");
   if(!kickChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
		bot.users.get(kUser.id).send(`Izbaceni ste! Razlog: ${kReason}. Izbacio vas je <@${message.author.id}>.`);
   message.guild.member(kUser).kick(kReason);
   kickChannel.send(kickEmbed);


}
if(command === "forcekick"){

		if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Ne mogu pronaci usera!");
   let kReason = args.join(" ").slice(22);

   let bicon = bot.user.displayAvatarURL;
   let kickEmbed = new Discord.RichEmbed()
   .setAuthor("Novi kick (Force)", bicon)
   .setDescription("~Kick~")
   .setFooter(`ID: ${kUser.id}`)
   .setColor("#7289DA")
   .addField("User", `${kUser}` , true)
   .addField("Moderator", `<@${message.author.id}>`, true)
   .addField("Vrijeme", message.createdAt)
   .addField("Razlog", kReason, true);

   let kickChannel = message.guild.channels.find(`name`, "modlog");
   if(!kickChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
		bot.users.get(kUser.id).send(`Izbaceni ste (Force)! Razlog: ${kReason}. Izbacio vas je <@${message.author.id}>.`);
   message.guild.member(kUser).kick(kReason);
   kickChannel.send(kickEmbed);


}
if(command === "report"){

	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Ne mogu pronaci usera.");
	if(rUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne mozete reportati tog usera!");
    let reason = args.join(" ").slice(22);

    let bicon = bot.user.displayAvatarURL;
    let reportEmbed = new Discord.RichEmbed()
    .setAuthor("Novi report", bicon)
    .setDescription("~Report~")
    .setColor("#7289DA")
    .addField("Reported User", `${rUser} sa ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} sa ID: ${message.author.id}`)
    .addField("Kanal", message.channel)
    .addField("Vrijeme", message.createdAt)
    .addField("Razlog", reason);


    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Ne mogu naci reports kanal!");

    reportschannel.send(reportEmbed);


}
if(command === "tempmute"){

  let tomute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!tomute) return message.channel.send("Ne mogu naci usera.");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne, ne, ne...");
  if(tomute.hasPermission("BAN_MEMBERS", "KICK_MEMBERS")) return message.channel.send("Ne mogu mute tog usera");
  let muterole = message.guild.roles.find(`name`, "Muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }


  let mutetime = args[1];
  if(!mutetime) return message.channel.send("Niste dodali vrijeme!");

  await(tomute.addRole(muterole.id));
  message.channel.send(`${tomute.user.tag} je mute-an.`);
  		bot.users.get(tomute.id).send(`Utisani ste! Utisao vas je <@${message.author.id}>.`);
      let bicon = bot.user.displayAvatarURL;
    let banEmbed = new Discord.RichEmbed()
    .setAuthor("Novi mute", bicon)
    .setDescription("~Mute~")
    .setFooter(`ID: ${tomute.id}`)
    .setColor("#7289DA")
    .addField("User", `${tomute}` , true)
    .addField("Moderator", `<@${message.author.id}>`, true)
	.addField("Vrijeme", message.createdAt)
    .addField("Trajanje", mutetime, true);

    let muteChannel = message.guild.channels.find(`name`, "modlog");
    if(!muteChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
    muteChannel.send(banEmbed);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`${tomute.user.tag} je unmute-an!`);
  }, ms(mutetime));



}
if(command === "forcetempmute"){

  	if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
  let tomute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!tomute) return message.channel.send("Ne mogu naci usera.");
  let muterole = message.guild.roles.find(`name`, "Muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }


  let mutetime = args[1];
  if(!mutetime) return message.channel.send("Niste dodali vrijeme!");

  await(tomute.addRole(muterole.id));
  message.channel.send(`${tomute.user.tag} je mute-an.`);
  bot.users.get(tomute.id).send(`Utisani ste (Force)! Utisao vas je <@${message.author.id}>.`);
      let bicon = bot.user.displayAvatarURL;
    let banEmbed = new Discord.RichEmbed()
    .setAuthor("Novi mute (Force)", bicon)
    .setDescription("~Mute~")
    .setFooter(`ID: ${tomute.id}`)
    .setColor("#7289DA")
    .addField("User", `${tomute}` , true)
    .addField("Moderator", `<@${message.author.id}>`, true)
	.addField("Vrijeme", message.createdAt)
    .addField("Trajanje", mutetime, true);

    let muteChannel = message.guild.channels.find(`name`, "modlog");
    if(!muteChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
    muteChannel.send(banEmbed);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`${tomute.user.tag} je unmute-an!`);
  }, ms(mutetime));
	
}

if(command === "resetnick"){
	if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Ne. Zec to ne dopusta.");
	if(!args[0]){
	message.guild.members.get(bot.user.id).setNickname("Žec");
	message.channel.send(":white_check_mark: Resetirao sam svoj nick!");
	}
	else{
		let toResetNick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		message.guild.members.get(toResetNick.id).setNickname(toResetNick.user.username);
		message.channel.send(`:white_check_mark: Resetiran nick za ${toResetNick.user.username}`);
	}

}
if(command === "setnick"){
	if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Ne, ne, ne...");
	if(!args[0]) return message.reply("Dodajte usera!");
	 let person = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	 if(!person) return message.reply("Ne mogu pronaci usera!");
	message.guild.members.get(person.id).setNickname(args[1]);
	message.channel.send(`Nick postavljen za ${person.user.username} :white_check_mark:`);

}
if(command === "resetservers"){
	if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
	servers = [];
	hack = 0;
	message.channel.send(":white_check_mark: Resetirano!");
	bot.user.setActivity("z!help");

}
if (command==="getservers"){
	var i;
	if(servers.length == 0) return message.channel.send ("Nema hakiranih servera!");
	if(servers.length != 0){
		for(i=0; i<servers.length;i++){
		message.channel.send(`Hacked servers: ${bot.guilds.get(servers[i])}\n`);
		}
	}


}
if(command==="fact"){

		try {
			const article = await randomWikipediaArticle();
			const {body} = await request1
				.get('https://en.wikipedia.org/w/api.php')
				.query({
					action: 'query',
					prop: 'extracts',
					format: 'json',
					titles: article,
					exintro: '',
					explaintext: '',
					redirects: '',
					formatversion: 2
				});
			let fact = body.query.pages[0].extract;
			if (fact.length > 200) {
				const facts = fact.split('.');
				fact = `${facts[0]}.`;
				if (fact.length < 200 && facts.length > 1) fact += `${facts[1]}.`;
			}
			return message.channel.send(fact);
		} catch (err) {
			return message.reply(`Greska: \`${err.message}\`. Pokusajte ponovno kasnije!`);
		}


	async function randomWikipediaArticle() {
		const {body} = await request1
			.get('https://en.wikipedia.org/w/api.php')
			.query({
				action: 'query',
				list: 'random',
				rnnamespace: 0,
				rnlimit: 1,
				format: 'json',
				formatversion: 2
			});
		return body.query.random[0].title;
	}
};
if(command==="warn"){

  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne! Zec ne dopu�ta!");
  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if(!wUser) return message.channel.send("Ne mogu pronaci usera.");
  if(wUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne mozete upozoriti tu osobu.");
  let reason = args.join(" ").slice(22);
   let warnEmbed = new Discord.RichEmbed()
  .setAuthor("Novi warn", bot.user.displayAvatarURL)
  .setDescription("~Upozorenje~")
  .setColor("#7289DA")
  .addField("User", `<@${wUser.id}>`, true)
  .addField("Moderator", `<@${message.author.id}>`, true)
  .addField("Vrijeme", message.createdAt)
  .addField("Razlog", reason, true);
   message.channel.send(warnEmbed);
   bot.users.get(wUser.id).send(`Upozoreni ste! Razlog: ${reason}. Upozorio vas je <@${message.author.id}>.`);
   let warnChannel = message.guild.channels.find(`name`, "modlog");
   if(!warnChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
   warnChannel.send(warnEmbed);

}
if(command==="dm"){
  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne! Zec ne dopu�ta!");
  let dmUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if(!dmUser) return message.channel.send("Ne mogu pronaci usera.");
  let messageToSend = args.join(" ").slice(22);
  bot.users.get(dmUser.id).send(messageToSend);
  message.channel.send(`Sent message to ${dmUser.user.username} with message: ${messageToSend}!`);

}
if(command==="forcewarn"){

  	if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Ne! Zec ne dopu۴a!");
  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if(!wUser) return message.channel.send("Ne mogu pronaci usera.");
  let reason = args.join(" ").slice(22);
   let warnEmbed = new Discord.RichEmbed()
  .setAuthor("Novi warn (Force)", bot.user.displayAvatarURL)
  .setDescription("~Upozorenje~ (Force)")
  .setColor("#7289DA")
  .addField("User", `<@${wUser.id}>`, true)
  .addField("Moderator", `<@${message.author.id}>`, true)
  .addField("Vrijeme", message.createdAt)
  .addField("Razlog", reason, true);
   message.channel.send(warnEmbed);
   bot.users.get(wUser.id).send(`Upozoreni ste (Force)! Razlog: ${reason}. Upozorio vas je <@${message.author.id}>.`);
   let warnChannel = message.guild.channels.find(`name`, "modlog");
   if(!warnChannel) return message.channel.send("Ne mogu pronaci modlog channel.");
   warnChannel.send(warnEmbed);

}
if(command === "cat") {

	let{body} = await superagent
    .get(`http://aws.random.cat/meow`);

  let catembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle("Macka :cat:")
  .setImage(body.file);
  message.channel.send(catembed);
}
if(command === "advice") {

	const res = await superagent.get('http://api.adviceslip.com/advice');
	const { slip: { advice } } = JSON.parse(res.text);
	message.channel.send(`${advice}`);

}
if(command==="randomcase"){

	if(!args[0]) return message.reply("Dodajte tekst!");
	let text = args.slice(0).join(" ");

	message.channel.send(randomCase(text));

}
if(command === "wouldyourather"){

	let { body } = await superagent.get('http://www.rrrather.com/botapi');
	const sentence = `${body.choicea} **or** ${body.choiceb}?`;
	let msg = await message.channel.send(`Would you rather - ${sentence}`);
	msg.react("1⃣");
	msg.react("2⃣");
}
if(command === "doggo" || command === "dog"){

	let{body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`);

  let dogembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle("Doggo :dog:")
  .setImage(body.message);
  message.channel.send(dogembed);


}
if(command === "shorten"){
	let urlToShorten = args.join(" ").toString();
	console.log(urlToShorten);
	let {text} = await superagent.get(`https://is.gd/create.php?format=simple&url=${urlToShorten}`)
	let urlEmbed = new Discord.RichEmbed()
	.setColor("#7289DA")
	.setTitle("Here is your URL")
	.addField(`${text}`)
	message.channel.send(urlEmbed);
}
if(command === "snek" || command === "snake"){

let urlIndex = Math.round(getRandomNumber(0,sneks.length))
let snekImage = sneks[urlIndex];
  let snekembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle(":snake:")
  .setImage(snekImage);
  message.channel.send(žembed);


}
if(command === "avatar"){
 let embed = new Discord.RichEmbed()
        .setImage(message.author.displayAvatarURL)
        .setColor("RANDOM");
		
 message.channel.send(embed);


}
if(command === "bible"){

	if(!args[0]) return message.reply("Dodajte knjigu! (John)");
	if(!args[1]) return message.reply("Dodajte red i poglavlje (3:17)");
	let book = args[0].toString();
	let cav = args[1].toString();
	let{body} = await superagent.get(`https://bible-api.com/${book}%20${cav}`);

  let bEmbed = new Discord.RichEmbed()
  .setAuthor("Here is your verse")
  .setColor("#7289DA")
  .addField(body.text)
  .setFooter(body.reference)
  message.channel.send(bEmbed);


}
	
if(command === "bitcoin"){
let{body} = await superagent.get(`https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=HRK`);
message.channel.send(`Bitcoin price: ${body[0].price_hrk} kn\nPromjena u 1h: ${body[0].percent_change_1h}%\nPromjena u 24h: ${body[0].percent_change_24h}%\nPromjena u 7 dana: ${body[0].percent_change_7d}%`);

}
	
if(command === "memegen"){

	if(!args[0]) return message.reply("Dodajte template! Sve template-ove mozete naci na stranici: https://memegen.link/api/templates/");
	if(!args[1]) return message.reply("Dodajte gornji tekst!");
	if(!args[2]) return message.reply("Dodajte donji tekst!");
	let template = args[0].toString();
	let text1 = args[1].toString();
	let text2 = args[2].toString();

  let bEmbed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle("Here is your meme")
  .setImage(`https://memegen.link/${template}/${text1}/${text2}.jpg`)
  message.channel.send(bEmbed);


}
if(command === "ducc"  || command === "duck"){

	let{body} = await superagent
    .get(`https://random-d.uk/api/random`);

  let duccembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle(":duck:")
  .setImage(body.url);
  message.channel.send(duccembed);


}
if(command === "birb" || command === "bird"){

	let{text} = await superagent.get(`https://random.birb.pw/tweet`);
  let testEmbed = new Discord.RichEmbed()
	.setColor("0x000000")
	.setTitle("Birb")
	.setImage(`https://random.birb.pw/img/${text}`);
	message.channel.send(testEmbed);


}
if(command === "captcha"){

	const {body} = await superagent.get(`https://nekobot.xyz/api/imagegen?type=captcha&url=${message.author.displayAvatarURL}&username=${message.member.displayName}`);
	const captchaEmbed = new Discord.RichEmbed()
	.setColor("#7289DA")
	.setTitle("Your captcha")
	.setImage(body.message)
	message.channel.send(captchaEmbed);
}
if(command === "meme"){

 let reddit = [
        "memes",
		"dankmemes"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
	
	randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url
                }]
            })
    }).catch(err => console.log(`Greska (meme): {err}`));



}
if(command === "randomcolor"){

	const hex = Math.random().toString(16).slice(2, 8);
	const colorEmbed = new Discord.RichEmbed()
	.setColor(parseInt(hex,16));
	message.channel.send(colorEmbed);


}

if(command === "chucknorris"){

	request('http://api.icndb.com/jokes/random', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var json = JSON.parse(body);

            if (!json.type || json.type !== 'success') {
                return message.channel.send('Steta...')
                }

                message.channel.send(json.value.joke);
		}
         else {
            return message.channel.send('Steta...')
            }


})}
if(command === "info") {

	let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Server kreiran ${message.guild.createdAt}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("ID", message.guild.id, true)
   .addField("Ime", message.guild.name, true)
   .addField("Vlasnik", message.guild.owner.user.tag, true)
   .addField("Regija", message.guild.region, true)
   .addField("Kanali", message.guild.channels.size, true)
   .addField("Members", message.guild.memberCount, true)
   .addField("Humans", message.guild.memberCount-message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Uloge", message.guild.roles.size, true);
   message.channel.send(serverembed);
}
if(command === "status") {

	let sicon = bot.user.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
   .setAuthor("Zec - Status", sicon)
   .setFooter(`Status Žec bota`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("ID", bot.user.id, true)
   .addField("Ime", bot.user.username, true)
   .addField("Uptime", GetUptime(), true)
   .addField("Bot kreiran",bot.user.createdAt.toLocaleString(),true)
   message.channel.send(serverembed);
}

});

bot.on("message", function(message){
	if(message.channel.type === "dm") return;
	let prefix = db.fetch(`prefix_${message.guild.id}`);
	if(!prefix){
		prefix = "z!";
	}
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	let args = message.content.split(" ").slice(1);
	if (command === "coinflip")
	{
		coin = Math.floor(Math.random() * 2);
		if (coin == 0) {
  		message.channel.send("Glava!");
  	} else {
  		message.channel.send("Pismo!");
  	}


	} else
	if (command === "dice")
	{
		const answers = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		const embed = new Discord.RichEmbed()
			.setColor("#7289DA")
			.addField("🎲", `Zarolao si: ${answer}!`);
		message.channel.send({ embed });


	} else
	if (command === "ip")
	{
		if(ip === "offline"){
			message.channel.send(`Server je offline.`);
		}
		else{
		message.channel.send(`IP: ${ip}\nDodji i zabavi se!`);
		}


	} else
	if (command === "setgame"){

		if(!args[0]) return message.reply("Sto da igram?");
	  if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopu�ta!");
	const status = args.join(' ');
	if (status.length === 0) {
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription('Sto zelis da igram?');
    message.channel.send({ embed });
  }

  else if (status.length !== 0) {
	  cycle = 0;
   bot.user.setActivity(`${status}`, {  type: "PLAYING"});
  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setDescription(':white_check_mark: Uspjesno si promijenio status!');
  message.channel.send({ embed });
}


	} else
	if (command === "setwatch"){

		if(!args[0]) return message.reply("Sto da gledam?");
	  if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopu�ta!");
	const status = args.join(' ');
	if (status.length === 0) {
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription('Sto zelis da gledam?');
    message.channel.send({ embed });
  }

  else if (status.length !== 0) {
	  cycle = 0;
   bot.user.setActivity(`${status}`, {  type: "WATCHING"});
  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setDescription(':white_check_mark: Uspjesno si promijenio status!');
  message.channel.send({ embed });
}


	} else
	if (command === "ping"){

		if(pingspoof == 1){
			message.channel.send('Pong!').then((msg) => {
		msg.edit(`Pong! ${Math.round(getRandomNumber(2000,5000))}ms`);
		})
		}
		else{
		
		message.channel.send('Pong!').then((msg) => {
		message.delete();
        const embed = new Discord.RichEmbed()
		.setColor("#7289DA")
		.setDescription(`Ping: \`${msg.createdTimestamp - message.createdTimestamp}ms\`\n API Latency: \`${Math.round(bot.ping)}ms\``)
		message.channel.send(embed);
});
		}

	} else
	if (command === "pingspoof"){

		if(pingspoof===0){
		 message.channel.send("Ping spoof activated!").then((msg) => {
		msg.edit(`Ping spoof **activated**! :white_check_mark:`);
		})
		pingspoof = 1;
		}
		else{
		 message.channel.send("Ping spoof deactivated!").then((msg) => {
		msg.edit(`Ping spoof **deactivated**! :regional_indicator_x:`);
		})
		pingspoof = 0;
		}
	} else
	if (command === "hack"){
		if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
		var user = message.guild.members.random();
		if(servers.includes(message.guild.id)) return message.channel.send("Server je vec hakiran!");
		servers.push(message.guild.id);
		while (user.id == "424304520386969602" || user.id == "470211494639042590") {
			user = message.guild.members.random();
		}

		 message.channel.send('Hacking... ').then((msg) => {
			 setTimeout(function(){

msg.edit(`Hacking... Done!`);
hack++;
const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setDescription(`${user.user} Hacked by Ž3c`);
message.channel.send({ embed });
		bot.user.setActivity(`Hacked ${hack} server(s)!`);
}, 2000)

		})



	} else
	if (command === "date")
	{
		message.channel.send(`Trenutni datum i vrijeme: ${message.createdAt.toLocaleString()}`);


	} else
	if (command === "resetgame")
	{
		cycle = 1;
		if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
		bot.user.setActivity("z!help");
		message.channel.send(":white_check_mark: Uspjesno resetirana igra! ;)")


	} else
	if(command === "setservers"){
		if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
		bot.user.setActivity(`na ${bot.guilds.size} servera`);
		cycle = 0;
		message.channel.send(`:white_check_mark: Broj servera: ${bot.guilds.size}`);


	} else
	if (command === "resetstatus")
	{
		if (message.author.id !== ('424304520386969602')) return message.channel.send("Ne. Zec to ne dopušta!");
		bot.user.setStatus("online")
		message.channel.send(":white_check_mark: Uspjesno resetiran status! ;)");


	} else
	if (command === "setstatus")
	{
		let statuses = {
		"online": "online",
		"on": "online",
		"invisible": "invisible",
		"offline": "invisible",
		"off": "invisible",
		"invis": "invisible",
		"i": "invisible",
		"dnd": "dnd",
		"idle": "idle",
		"away": "idle"
		};

		if(message.author.id !== '424304520386969602') return message.reply("Nemate dozvolu!");
		if(!args[0]) return message.channel.send("Dodajte status!");
		let status = statuses[args[0].toLowerCase()];
		if(!status) {
		return message.channel.send(`${status} nije valjani status!`);
		}
		if(status === "on") status = "online";
		if(status === "off") status = "invisible";
		if(status === "i") status = "invisible";
		if(status === "offline") status = "invisible";
		bot.user.setStatus(status);
		message.channel.send(`:white_check_mark: Status promijenjen!`)


	} else
	if (command === "say") {
			message.delete();
		if(!args[0]) return message.reply("Sto da kazem?");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ne. Zec to ne dopusta.");
		let botmessage = args.join(" ");
		message.channel.send(botmessage);

	} else
	
	if (command === "help") {
		const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Komande:")
		.addField("z!ip", "IP servera")
		.addField("z!purge [broj]", "Obrisi [broj] poruka!")
		.addField("z!say [text]", "Reci Zecu sto da kaze! Zakon!!!")
		.addField("z!date", "Trenutni datum i vrijeme")
		.addField("z!dice", "Uzmi Zeca za covjece ne ljuti se!")
		.addField("z!randomcase [text]", "Neka se Zec poigra sa tvojom rijeci")
		.addField("z!uptime", "Koliko Zec pazi na tvoj server?")
		.addField("z!yesno [pitanje]", "Zec odgovara sa da ili ne")
		.addField("z!poll [pitanje]", "Zec stvara ankete (vase, tako da nisu dosadne) :)")
		.addField("z!ascii [text]", "Zec ce tvoju poruku pretvoriti u umjetnost")
		.addField("z!chucknorris", "Neka ti Zec posalje nasumicnu cinjenicu Chuck Norrisa")
		.addField("z!coinflip", "Pismo ili glava pitanje je sada")
		.addField("z!fact", "Produbi znanje nasumicnom cinjenicom")
		.addField("z!8ball [pitanje]", "Zec prorice buducnost (nemojte nikome reci)")
		.addField("z!doggo", "Zec obozava pse :dog:")
		.addField("z!ping", "Zecov ping")
		.addField("z!pingspoof", "I'm a ping spoofer!")
		.addField("z!meme", "Neka ti Zec posalje najnovije memeove")
		.addField("z!info", "Informacije o serveru")
		.addField("z!dmall", "DM all members!")
		.addField("z!earth", "Ping NASA for live footage of Earth!")
		.addField("z!iss", "Lokacija ISS-a")
		.addField("z!astronauts", "Broj astronauta na ISS-u")
		.addField("z!cat", "Zec obozava macke :cat:")
		.addField("z!vrijeme [lokacija]", "Zec je i meteorolog?")
		.setFooter("Help, Strana 1/2, (neobavezno), [obavezno]")
		const helpEmbed2 = new Discord.RichEmbed()
		.setColor(0x954D23)
		.addField("z!status", "Status Žec bota")
		.addField("z!kill [user]", "Bolje da ne pricam...")
		.addField("z!report [user] [reason]", "Prijavi krsitelje pravila na serveru.")
		.addField("z!embed [poruka]", "Pretvori poruku u malo vise umjetnicki nacin")
		.addField("z!spam (poruka) [brojPoruka]", "Spam, spam1, spam2, spam3...")
		.addField("z!spoiler [message]", "⬛⬛⬛⬛⬛⬛")
		.addField("z!invites", "Top invites")
		.addField("z!lockdown [time]", "Zakljuc!")
		.addField("z!randomcolor", "Zec je pravi umjetnik. Dat cu ti najbolju boju koju zamislim.")
		.addField("z!wouldyourather", "Zelis li ovo? Ili mozda ovo?")
		.addField("z!onlinemembers", "Tko je sve online? Tko se nije skrio upisan je bio :wink:")
		.addField("z!smalltext [text]", "Ne moram ni objasnjavati...")
		.addField("z!captcha", "Vas captcha! Nadam se da cete ga uspjeti rijesiti!")
		.addField("z!math [izraz]", "Ovo je super korisno za hitne situacije!")
		.addField("z!advancedmath [operacija] [izraz]", "Zec je naucio i malo slozeniju matematiku.")
		.addField("z!birb", "Pticica!")
		.addField("z!withrole [role]", "Svi sa zadanom ulogom")
		.addField("z!rar [@user]", "Remove all roles from an user.")
		.addField("z!ducc", "Random duck!")
		.addField("z!bitcoin", "Informacije o Bitcoinu")
		.addField("z!bible [knjiga (John)] [poglavlje:red]", "Biblija!")
		.addField("z!snek", "Zmija! :snake:")
		.addField("z!shorten [url]", "Skracivanje URL-a! Zakon!")
		.addField("z!advice", "Savjet sa svakidasnji zivot!")
		.addField("z!setnick (@user)", "Postavi nadimak!")
		.setFooter("Help, Strana 2/2, (neobavezno), [obavezno]")
		if(!args[0]){

		message.channel.send({embed})
    .then(msg => {

        message.channel.send(helpEmbed2);
    });
		}
		if(parseInt(args[0])==1){
			message.channel.send({embed});
		}
		if(parseInt(args[0])==2){
			message.channel.send(helpEmbed2);
		}


	} else
	if (command === "vrijeme" || command === "weather") {
		weather.find({search: args.join(" "), degreeType: "C"}, function(err, result){
		if (err) message.channel.send(err);
		if (result === undefined || result.length === 0){
		message.channel.send("Enter valid location!");
		return;
		}
		var current = result[0].current;
		var location = result[0].location;
		const embed = new Discord.RichEmbed()
                .setAuthor(`Weather for: ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone',`UTC${location.timezone}`, true)
                .addField('Temperature',`${current.temperature} °C`, true)
                .addField('FeelsLike', `${current.feelslike} °C`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

		message.channel.send({embed})

	}
	);
}})
bot.on("ready", () => {
  console.log("Zec je spreman za polijetanje na tvoj server.");
  bot.user.setActivity("z!help");
  d = new Date("2020","0","5");
  wait(1000);
  bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
antispam(bot, {
  warnBuffer: 5,
  maxBuffer: 7,
  interval: 2000, 
  warningMessage: "prestanite spamovati! Biti cete banovani.",
  banMessage: "je banovan sa servera. Razlog: Spamovanje",
  maxDuplicatesWarning: 7,
  maxDuplicatesBan: 10,
  deleteMessagesAfterBanForPastDays: 7,
  exemptRoles: [],
  exemptUsers: ["ivan.fergus08#1555"]
});
 	  
  setInterval(function(){
		if(cycle == 1){
			statusesChanges++;
	GetRandomStatus();
		}
  }, 15000);
  setInterval(function(){
		if(today(d) && cestitao == 0){
			cestitao = 1;
			bot.users.get("376757606091325440").send('**Sretan rodjendan, kume!** :tada:');
			bot.users.get("424304520386969602").send('**Yo, kumu je rodjendan!** :tada:');
		}
  }, 60000);
	 
});
bot.login(process.env.BOT_TOKEN)

function GetUptime(){

	let mesejdz = 'Uptime: ';
  const totalSeconds = process.uptime();
  const days = Math.floor((totalSeconds % 31536000) / 86400);
  const hours = _.parseInt(totalSeconds / 3600) % 24;
  const minutes = _.parseInt(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);
  mesejdz += days >= 1 ? `${days}d ` : '';
  mesejdz += hours < 10 ? `0${hours}:` : `${hours}:`;
  mesejdz += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  mesejdz += seconds < 10 ? `0${seconds}` : `${seconds}`;
  return mesejdz;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);

}
function getComputerChoice(){
	let choices = ["rock", "paper", "scissors"];
	let indexChoice = Math.round(getRandomNumber(0,2));
	let choice = choices[indexChoice];
	return choice;
}
function GetRandomStatus(){
	let statusIndexChoice = Math.round(getRandomNumber(0, statusesToCycle.length));
	let statusChosen = statusesToCycle[statusIndexChoice];
	bot.user.setActivity(statusChosen);
}
function today(td) {
    var d = new Date();
    return td.getDate() == d.getDate() && td.getMonth() == d.getMonth() && td.getFullYear() == d.getFullYear();
}
function EmbedIt(channel, what, author){
	let embedsay = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`${what.toString()}`)
        .setDescription(author.username, author.iconURL);
    channel.send(embedsay);
}

function checkMsg(str, char)
 {
  let ctr = 0;
  for (let i = 0; i < str.length; i++)
  {
    if (str.charAt(i) == char) {
      ctr++;
    }
  }
  return ctr>= 2;
}

function manageInvites(member){
	
	member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = bot.users.get(invite.inviter.id);
	if(!db.fetch(`inviteChannel_${member.guild.id}`)){
		console.log(`Nemam invite channel na ${member.guild.name}`);
		return;
	}
    const logChannel = member.guild.channels.find(channel => channel.id === db.fetch(`inviteChannel_${member.guild.id}`));
    logChannel.send(`${member} **joined**; Invited by **${inviter.username}** (**${invite.uses} invites**)`);
});
}

function reboot(){
 bot.destroy();
 bot.login(process.env.BOT_TOKEN);
}

function shorten(text, maxLen = 2000) {
	return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}
