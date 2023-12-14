const http = require("./controller/http/index")
const telegram = require("./controller/telegram/index");

async function init()
{
  await http.init();
  await telegram.init()
}

init()
