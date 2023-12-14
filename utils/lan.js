const text = [
    {
        "mainMenu":[
`*Welcome to LNID protocol.*

You can register your own \`.LNS\` domain name here 

And claim your Lightning Network identity \`LNID\`.

`,
`*Your Domain : *`,
`
\`You don't have any domain yet\``
        ]
    }
]

const btn = [
    {
        "mainMenu":[
            `Register domain`,
            `Domain manager`,
            `Address book`
        ],
        "backAndClose":
        [
            `🏡 Menu`,
            `❎ Close`
        ]
    }
]

function backAndClose(lan)
{
    var raw = getBtn(lan);
    return [
        {
            "text":raw.backAndClose[0],
            "callback_data":"/menu"
        },
        {
            "text":raw.backAndClose[1],
            "callback_data":"/close"
        }
    ]
}

function mainMenuButton(lan)
{
    var raw = getBtn(lan)
    return [
        [
            {
                "text":raw.mainMenu[0],
                "callback_data":"/register_domain"
            },
        ],
        [
            {
                "text":raw.mainMenu[0],
                "callback_data":"/manage_domain"
            },
        ],
        [
            {
                "text":raw.mainMenu[0],
                "callback_data":"/address_book"
            },
        ],
        backAndClose(lan)
    ]
}

function getText(lan)
{
    return text[0];
}

function getBtn(lan)
{
    return btn[0];
}

module.exports = {
    getText,
    getBtn,
    mainMenuButton,
    backAndClose
}