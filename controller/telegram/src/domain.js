const db = require("../../../utils/db");
const tg = require("../../../utils/tg");
const lan = require("../../../utils/lan")
const config = require("../../../config.json")

async function reg(bot,uid,req,data,opts)
{
    var text = lan.getText()
    let contentMessage = await bot.sendMessage(uid, text['placeHolder'][0], {
        parse_mode:'MarkDown',
        "reply_markup": {
            "force_reply": true
        }
    });
    listenerReply = (async (replyHandler) => {
            bot.removeReplyListener(listenerReply);
            await bot.deleteMessage(contentMessage.chat.id,contentMessage.message_id);
            await bot.deleteMessage(replyHandler.chat.id,replyHandler.message_id);
            var name = replyHandler.text;
            if((await db.getDomainByName(name)).length > 0)
            {
                //domain exsit
                return await tg.tryBotSendMessage(bot,uid,text['placeHolder'][1],{
                    parse_mode:'MarkDown',
                    disable_web_page_preview:"true",
                    reply_markup: JSON.stringify({
                      inline_keyboard:  [lan.backAndClose()]
                    })
                });
            }else{
                //new domain
                var finalText = ` *${name}${config.domain.defaultTLD}* & *${name}${config.domain.defaultLN}* ${text['register'][0]} ` 

                return await tg.tryBotSendMessage(bot,uid,finalText,{
                    parse_mode:'MarkDown',
                    disable_web_page_preview:"true",
                    reply_markup: JSON.stringify({
                    inline_keyboard:  lan.registerConfirm(name)
                    })
                });
            }
            
        });
      bot.onReplyToMessage(contentMessage.chat.id, contentMessage.message_id, listenerReply);
    return true ;

}

async function regConfirm(bot,uid,req,data,opts)
{
    if(req.params.length>0)
    {
        await db.newDomain(
            {
                uid:uid.toString(),
                name:req.params[0],
                tld:config.domain.defaultTLD,
                visit:config.domain.defaultLN,
                forward:{
                    ln:{},
                    nostr:{}
                },
                createTime:Date.now(),
            }
        )
    }
}

async function domainManage(bot,uid,req,data,opts)
{
    if(req.params.length>0)
    {
        const domain = await db.getDomainByName(req.params[0]);
        if(domain.length>0 && domain[0]['uid'] == uid)
        {

        }
    }
}
module.exports = {
    reg,
    regConfirm
}