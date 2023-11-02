let handler = async (m, { conn }) => {
conn.reply(m.chat, `_List Group Morningstar_
*Offcial Group*
${link.gc}

*Zakki Store*
https://chat.whatsapp.com/EU1ncdDyPMVL3V2p6srShx
`, m)
}
handler.help = ['gcbot']
handler.tags = ['info']
handler.command = /^gcbot$/i

export default handler 
