const fs = require('node:fs');
const { system_message } = require('../system_messages.js')
const { botManagers } = require("../config.json")

async function threads(cleverbot, message) {
    //load thread data
    let thisthread = JSON.parse(fs.readFileSync(`./convos/threads/${message.channel.id}.json`))

    if (message.content == "--claim-thread") { //STAFF - claim thread
        if (botManagers.includes(message.author) ) { 
            //You can do that!
            message.reply(system_message("thd_STAFFONLY_claimed"))
            thisthread.author = message.author
            thisthread = JSON.stringify(thisthread)
            fs.writeFileSync(`./convos/threads/${message.channel.id}.json`, thisthread)
            return;
        } else {
            message.reply(system_message("thd_err_unauth")) //You can't do that!
        }
    } else if (message.content == "--delete-thread") { //Delete thread (thread owner command)
        if (message.author == thisthread.author) { 
            //You can do that!
            fs.unlinkSync(`./convos/threads/${message.channel.id}.json`)
            await message.channel.delete();
            return;
        } else {
            message.reply(system_message("thd_err_unauth")) //You can't do that!
        }
    } else if (message.content == "--reset-convo") {
        if (message.author == thisthread.author) {
            thisthread.context = []
            thisthread = JSON.stringify(thisthread)
            fs.writeFileSync(`./convos/threads/${message.channel.id}.json`, thisthread)
            message.reply(system_message('dm_reset'))
        } else {
            message.reply(system_message("thd_err_unauth"))
        }
    } else {
        let mymessage = message.content
        let resp;

        await cleverbot(mymessage, thisthread.context).then(response => 
            resp = response
        );

        await message.channel.send(resp)
        await thisthread.context.push(mymessage)
        await thisthread.context.push(resp)
        thisthread = JSON.stringify(thisthread)
        fs.writeFileSync(`./convos/threads/${message.channel.id}.json`, thisthread)
    }
}

async function createThread(message, clientId) {
    let threadName = message.content.replace(`<@${clientId}>`, "") //remove the mention
	threadName = threadName.replace("--thread", "") //remove the --full-sentience

    if (threadName.length < 4) return message.reply(system_message("thd_err_invalidName")) //Tell the user the name is too short!

    //Create the thread on the users message
    const thread = await message.startThread({
        name: threadName,
        autoArchiveDuration: 60,
        reason: 'Requested by user',
    });

    //Send starting message
    thread.send(`<@${message.author.id}> ${system_message("thd_start")}`)

    //Create thread file for personal reference
    let threadInfo = {"author": message.author.id, "context": []}
    fs.writeFileSync(`./convos/threads/${thread.id}.json`, JSON.stringify(threadInfo))
    let jsondata = JSON.parse(fs.readFileSync("./convos/threads/list.json"))
    jsondata.push(thread.id)
    fs.writeFileSync("./convos/threads/list.json", JSON.stringify(jsondata))
}

module.exports = { threads, createThread }