import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
let teks = `❏ *_Harga Sewa_*
❃ _15 Hari 5k / Group_
❃ _30 Hari 10k / Group_
❃ _60 Hari 15k / Group_
❃ _90 Hari 20k / Group_
❃ _Permanen 25k / Group_

❏ *_Fitur_*
❃ _Antilink_
❃ _Welcome_
❃ _Enable_
❃ _Store List_
❃ _Promote/Demote_
❃ _HideTag_
❃ _Dan Lain Lain_



❏ *_Harga Premium_*
❃ _15 Hari / 5k_
❃ _30 Hari / 10k_
❃ _45 Hari / 15k_
❃ _60 Hari / 20k_
❃ _Permanen / 30k_

❏ *_Fitur_*
❃ _Unlimited Limit_
❃ _Nsfw_
❃ _Bebas Pakai Bot Di Pc_
❃ _Dan Lain Lain_

*_PROMO !!*
*_SEWA PERMANEN 15K_*
*_PREMIUM PERMANEN 5K_*

Minat? Silahkan Chat Nomor Owner Dibawah
https://wa.me/${owner[0][0]}
`.trim()
await conn.sendFile(m.chat, fs.readFileSync('./media/qris.jpg'), 'qris.jpeg', teks, m, false)
}
handler.help = ['sewa', 'premium']
handler.tags = ['info', 'main']
handler.command = /^(sewa|sewabot|premium|prem)$/i

export default handler