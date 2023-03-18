function system_message(type){
    let msg = `***[SYSTEM MESSAGE]***

`
    switch(type) {
        case 'dm_reset': {msg += `✅ Conversation history deleted!

***New conversations starts***
        
***===============================================***`} break;
        case 'dm_can_use': {msg += `✅ You can now use Annoying Popup DMs!`} break;
        case 'dm_export': {msg += `✅ DM exported!`} break;
        case 'txt_already_agreed': {msg += `You have already agreed to Cleverbot's rules!`} break;
        case 'txt_agreed': {msg += `✅ You can now use \`--full-sentience\`!`} break;
        case 'welcome_dm': {msg += `Annoying Popup DMs use the Cleverbot (<https://cleverbot.com/>) API. Before using it, please read the following:

\`\`\`diff
- may not be suitable for children - must be agreed by parent or guardian
        
- it learns and imitates, is social content and aims to pass the Turing Test
        
- can seem rude or inappropriate - talk with caution and at your own risk
        
- the bot pretends to be human - don't give personal info even if it 'asks'
        
- cleverbot does not understand you, and cannot mean anything it 'says'
\`\`\`
Unlike \`--full-sentience\`, Annoying Popup **does** store any messages relating to Cleverbot.
        
You can reset your conversation with \`--reset-convo\`
        
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