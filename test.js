const db = require("./utils/db")
async function test()
{
    const dm = await db.getDomain();

    console.log(dm)
}

test()