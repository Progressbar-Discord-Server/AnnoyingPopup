const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { DISCORD_clientId, DISCORD_token } = require('./config.json');
const { system_message } = require('./system_messages.js')
const Markov = require('js-markov');
const cleverbot = require("cleverbot-free");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
	partials: [Partials.Message, Partials.Channel],
});

client.once('ready', async() => {
	//check if needed files exist. if not, create them
	if(!fs.existsSync("./markov.txt")) {
		fs.writeFileSync("./markov.txt", "Hello, World!\n")
	}

	if(!fs.existsSync("./canUseFullSentience.json")) {
		fs.writeFileSync("./canUseFullSentience.json", "[]")
	}

	if(!fs.existsSync("./convos")) {
		fs.mkdirSync("./convos")
	}

	console.log(`✅ Signed in as ${client.user.tag}! \n`);
    client.user.setActivity('for your messages!', { type: ActivityType.Watching });
});


//Message Generation
client.on('messageCreate', async message => {
	if (message.author.bot) return;

	//check if sentence contains @everyone or @here
	if (message.content.includes('@everyone') || message.content.includes('@here')) return;

    //DM function
    if(message.channel.type === 1){
        if(!fs.existsSync(`./convos/${message.author.id}.json`)){
            //user does not have DM history with the bot
            if (message.content == "--understood-and-agreed") { //user agrees to cleverbot rules
				fs.writeFileSync(`./convos/${message.author.id}.json`, "[]")
				message.reply(system_message('dm_can_use'))
			} else {
				message.reply(system_message('welcome_dm')) //tell user about cleverbot rules
			}
        } else {
            //user DOES have history
            if (message.content == "--reset-convo") {
                fs.writeFileSync(`./convos/${message.author.id}.json`, "[]")
                message.reply(system_message('dm_reset'))
            } else {
                let jsondata = fs.readFileSync(`./convos/${message.author.id}.json`)
				jsondata = JSON.parse(jsondata)

				let mymessage = message.content

				let resp;

				await cleverbot(mymessage, jsondata).then(response => 
					resp = response
				);

				await message.author.send(resp)
				await jsondata.push(mymessage)
				await jsondata.push(resp)
				jsondata = JSON.stringify(jsondata)
				fs.writeFileSync(`./convos/${message.author.id}.json`, jsondata)
            }
        }
    }

    //Text Channel Functions
    //TODO: Remake this to support an array of allowed channels
    if(message.content.startsWith("<@511352076346064906>") && message.channel.id == "990334332231090217") {
        if (message.content.includes("--understood-and-agreed")) { //Agree to Cleverbot's rules
            //load agreed users array
            let jsondata = fs.readFileSync("./canUseFullSentience.json")
			jsondata = JSON.parse(jsondata)

			if(!jsondata.includes(message.author.id)) { //if the user isn't in the array
				message.reply(system_message(`txt_agreed`)) //tell them that they can use it now

                //add them to the array and write it.
                jsondata.push(message.author.id)
				jsondata = JSON.stringify(jsondata)
				fs.writeFileSync("./canUseFullSentience.json", jsondata)
			} else { //if the user is in the array
                message.reply(system_message(`txt_already_agreed`))
			}
        } else if (message.content.includes("--full-sentience")) { //Cleverbot
            //load the array of people who can use full-sentience
            let jsondata = fs.readFileSync("./canUseFullSentience.json")
			jsondata = JSON.parse(jsondata)

			if(jsondata.includes(message.author.id)) { //if they can use it
                let mymessage = message.content.replace("<@511352076346064906>", "") //remove the mention
				mymessage = mymessage.replace("--full-sentience", "") //remove the --full-sentience
                //get cleverbot reply
				cleverbot(mymessage).then(response => message.reply(response));
            } else {
                //tell the user they need to register
                message.reply(system_message('welcome_txt'))
            }
        } else { //Markov function
            fs.readFile('markov.txt', function(err, data) {
                var markov = new Markov();
                let arr = new Array();

                if(err) throw err;

                const parr = data.toString().replace(/\r\n/g,'\n').split('\n');

                for(let i of parr) {if(i.length > 0) arr.push(i);}

                markov.addStates(arr);

                markov.train();

                var txt = markov.generateRandom(1500);

                if(txt.length < 1) {message.channel.send("_ _");} else {message.reply(txt)}
            });
        }
    }

    //Message logging from the server
    //TODO: Remake this to support an array of allowed channels
    if (message.channel.id == "990334324362575892" || message.channel.id == "990334326526853130" || message.channel.id == "990334317337120808") {
        let msg = message.content
        
        const allMessage = fs.readFileSync('markov.txt', 'utf8');

        if (allMessage.includes(msg)) {
            return;
        } else {
            fs.appendFileSync('./markov.txt', `${msg}\n`)
        }
    }
})

//login to discord
client.login(DISCORD_token);

//error handlrz
process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
    console.log('----- Exception origin -----')
    console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----')
    console.log(promise)
    console.log('----- Reason -----')
    console.log(reason)
})