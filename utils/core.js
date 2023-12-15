const db = require("./db");
const api = require("./apis")
const tool = require("./tools")
const nt = require('nostr-tools')
async function getRecord(uanme)
{
    var ret = await db.getDomainByName(uanme);
    if(ret && ret.length > 0)
    {
        ret[0].forward.ln.rawData = Buffer.from(ret[0].rawData,"base64").toString("utf-8")
        ret[0].forward.ln.rawData = JSON.parse(ret[0].rawData)
        return ret[0].forward.ln
    }else{
        return false;
    }
}

async function newRecord(uanme,ln)
{
    if(!(await getRecord(uanme)))
    {

        var data = 
        {
            uanme:uanme,
            link:ln,
            raw:Buffer.from(JSON.stringify(
                await api.anyRequest(
                    tool.linkDecode(ln)
                )
            )).toString("base64")
        }
        console.log(data)
        if(data.raw)
        {
            await sql.newRecord(data);
            return true;
        }
    }
    return false;
}

async function getNip05(uanme)
{
    var ret = await db.getDomainByName(uanme);
    if(ret && ret.length > 0)
    {
        ret[0].forward.ln.rawData = Buffer.from(ret[0].rawData,"base64").toString("utf-8")
        ret[0].forward.ln.rawData = JSON.parse(ret[0].rawData)
        return ret[0].forward.ln
    }else{
        return false;
    }
}

async function newNip05(uanme,ln)
{
    if(!(await getNip05(uanme)))
    {
        var nip05Data = {
            names:{
            }
        }
        nip05Data['names'][uanme] = nt.nip19.decode(ln).data
        var data = 
        {
            uanme:uanme,
            link:ln,
            raw:Buffer.from(JSON.stringify(
                nip05Data
            )).toString("base64")
        }
        // console.log(data)
        if(data.raw)
        {
            await sql.newNip05(data);
            return true;
        }
    }
    return false;
}
module.exports = {
    getRecord,
    newRecord,
    getNip05,
    newNip05
}