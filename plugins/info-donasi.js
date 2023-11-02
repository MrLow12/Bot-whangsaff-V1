let handler = async (m, { conn, usedPrefix }) => {
	let donasi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *ᴛelkomsel* ${pay.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ
│ • *ɢᴏᴘᴀʏ* ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ
│ • *ᴏᴠᴏ* ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ
╰─────

_◛˖ ᴛᴇʀɪᴍᴀᴋᴀꜱɪʜ ᴜɴᴛᴜᴋ ʏᴀɴɢ ꜱᴜᴅᴀʜ ʙᴇʀᴅᴏɴᴀꜱɪ_`
await conn.sendFile(m.chat, pay.qris, 'qris.jpg', donasi, m)
}
handler.command = /^(donasi|dns)$/i
handler.tags = ['info']
handler.help = ['donasi']
export default handler