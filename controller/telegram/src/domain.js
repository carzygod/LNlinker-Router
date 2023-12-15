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
            var name = (replyHandler.text).toLowerCase();
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
                    nostr:{},
                    http:""
                },
                createTime:Date.now(),
            }
        )
        return domainManage(bot,uid,req,data,opts)
    }
}

async function domainManage(bot,uid,req,data,opts)
{
    if(req.params.length>0)
    {
        var name = (req.params[0]).toLowerCase();
        const domain = await db.getDomainByName(name);
        console.log(domain)
        if(domain.length>0 && domain[0]['uid'] == uid)
        {
            var d= domain[0];
            var ln = d.forward.ln?.link || "NA"
            var nst = d.forward.nostr?.address || "NA"
            var http = d.forward.http || "NA"

            var text = lan.getText()
            var finalText = `
*${text['domain'][0]} :*

${name}${config.domain.defaultLN}  &  ${name}${config.domain.defaultTLD}

${text['domain'][1]} : \`${ln}\`
${text['domain'][2]} : \`${nst}\`
${text['domain'][3]} : \`${http}\`
${text['domain'][4]} : \`${d.createTime}\`
            `
            return await tg.tryBotSendMessage(bot,uid,finalText,{
                parse_mode:'MarkDown',
                disable_web_page_preview:"true",
                reply_markup: JSON.stringify({
                inline_keyboard:lan.domainManage(name)
                })
            });
        }
    }else{

    }
}
module.exports = {
    reg,
    regConfirm,
    domainManage
}