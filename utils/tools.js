

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

module.exports = {
    linkDecode
}