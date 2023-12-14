

function linkDecode(ln)
{
    var data = ln.split("@");
    if(data.length>1)
    {
        var baseUrl = data[1];
        var uname = data[0];
        return `https://${baseUrl}/.well-known/lnurlp/${uname}`
    }
    
    return false;
}


function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
function pathRouter(data)
{
    var ret ={
        command:"unknown",
        params : []
    }
    var tmp_0 = data.split(" ");
    if(tmp_0.length>0)
    {
        var tmp_1 = tmp_0[0].split("/");
        if(tmp_1.length>0)
        {
            ret.command = tmp_1[1]
        }
        for(var i = 1 ; i < tmp_0.length ; i ++)
        {
            ret.params.push(tmp_0[i])
        }
    }
    return ret;
}


module.exports = {
    linkDecode,
    unique,
    pathRouter
}