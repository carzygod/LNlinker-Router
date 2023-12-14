/**
 * Try catch of telegram bot message
 */

async function tryBotSendMessage(bot,a,b,c)
{
    try{
        var r = await bot.sendMessage(a,b,c);
        return r 
    }catch(e){
        console.log(e)
        return false
    }
}

async function tryBoteditMessageReplyMarkup(bot,a,b)
{
    try{
        return await bot.editMessageReplyMarkup(a,b);
    }catch(e){
        return false
    }
}

async function tryBoteditMessageText(bot,a,b)
{
    try{
        return await bot.editMessageText(a,b);
    }catch(e){
        return false
    }
}

async function tryBotSendWarningWithBackClose(bot,a,b,lan,chainId)
{
    return await tryBotSendMessage(bot,a,b,                {
        reply_markup: JSON.stringify({
          inline_keyboard:  [button.closeAndBack(lan)]
        })
    });
}

async function tryBotSnedPhoto(bot,uid,img,markUp)
{
    try{
        return await bot.sendPhoto(
            uid,
            img,
            markUp
         );
    }catch(e)
    {
        console.log(e)
        return false
    }
}

async function tryBotDeleteMessage(bot,chatId,messageId)
{
    try{
        return await bot.deleteMessage(chatId,messageId);
    }catch(e){
        return false
    }
}
module.exports = {
    tryBotSendMessage,
    tryBoteditMessageReplyMarkup,
    tryBoteditMessageText,
    tryBotSendWarningWithBackClose,
    tryBotSnedPhoto,
    tryBotDeleteMessage
}