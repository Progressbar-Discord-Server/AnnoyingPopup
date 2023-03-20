function system_message(type){
    let msg = `***[SYSTEM MESSAGE]***

`
    switch(type) {
        case 'dm_reset': {msg += `✅ Conversation history deleted!

***New conversations starts***
        
***===============================================***`} break;
        case 'dm_can_use': {msg += `✅ You can now use Annoying Popup DMs!`} break;
        case 'dm_err': {msg += `⚠️ Hey there! I'm unable to DM you! Please check your DM settings.`} break;
        case 'dm_export': {msg += `✅ DM exported!
        
This is a JSON array that contains the message history between you and Cleverbot. Each even line is your message, each odd line is a Cleverbot message.`} break;
        case 'txt_already_agreed': {msg += `You have already agreed to Cleverbot's rules!`} break;
        case 'txt_agreed': {msg += `✅ You can now use \`--full-sentience\`!`} break;
        case 'thd_creating': {msg += `🔃 Creating thread...`} break;
        case 'thd_err_unauth': {msg += `❌ You cannot do that!`} break;
        case 'thd_STAFFONLY_claimed': {msg += `⚒️ Thread claimed!`} break;
        case 'thd_err_invalidName': {msg += `❌ Invalid thread name! Must be at least 5 characters long!`} break;
        case 'gen_help': {msg += `You can use my commands by pinging me and then followed by the command you want to run.

**Commands**
\`[no command]\` - Random markov generation from messages in the server.
\`[--help]\` - this
\`[--full-sentience]\` - Get Cleverbot to respond to your message
\`[--understood-and-agreed]\` - Agree to Cleverbot's rules
\`[--thread]\` - Create a thread where the bot can reply to any message
\`[--delete-thread]\` - Delete a thread created by the bot. Can only be used by the thread owner. (Thread Only)
\`[--reset-convo]\` - Reset the bot's memories (Thread + DM only)
\`[--export-convo]\` - Export the current conversation as a JSON file. (DM only)`} break;
        case 'thd_start': {msg += `✅ Thread started!

All messages in this thread (even if made by other members) will be replied to by Cleverbot.

Use \`--delete-thread\` to delete this thread (thread owner only).
Use \`--reset-convo\` to reset this thread's convo (thread owner only).`} break;
        case 'welcome_dm': {msg += `Annoying Popup DMs use the Cleverbot (<https://cleverbot.com/>) API. Before using it, please read the following:

\`\`\`diff
- may not be suitable for children - must be agreed by parent or guardian
        
- it learns and imitates, is social content and aims to pass the Turing Test
        
- can seem rude or inappropriate - talk with caution and at your own risk
        
- the bot pretends to be human - don't give personal info even if it 'asks'
        
- cleverbot does not understand you, and cannot mean anything it 'says'
\`\`\`
Unlike \`--full-sentience\`, Annoying Popup **does** store any messages relating to Cleverbot.
        
You can reset your conversation history with \`--reset-convo\`

You can export your conversation history with \`--export-convo\`
        
If you agree to the following, Say \`--understood-and-agreed\`.`} break;
        case 'welcome_txt': {msg += `The \`--full-sentience\` mode uses the Cleverbot (<https://cleverbot.com/>) API. Before using it, please read the following:

\`\`\`diff
- may not be suitable for children - must be agreed by parent or guardian
        
- it learns and imitates, is social content and aims to pass the Turing Test
        
- can seem rude or inappropriate - talk with caution and at your own risk
        
- the bot pretends to be human - don't give personal info even if it 'asks'
        
- cleverbot does not understand you, and cannot mean anything it 'says'
\`\`\`
Annoying Popup does not store any messages relating to Cleverbot.
        
If you agree to the following, mention me with \`--understood-and-agreed\``} break;
        default: {msg += `[ *invalid system message ID* ]`} break;
    }

    return msg;
}

module.exports = { system_message }