import axios from "axios";
import { sticker } from "../lib/sticker.js";

const quote = async(text, name, avatar) => {
const res = await axios.post('https://bot.lyo.su/quote/generate', {
  "type": "quote",
  "format": "png",
  "backgroundColor": "#FFFFFF",
  "width": 512,
  "height": 768,
  "scale": 2,
  "messages": [
    {
      "entities": [],
      "avatar": true,
      "from": {
        "id": 1,
        "name": name,
        "photo": {
          "url": avatar,
        }
      },
      "text": text,
      "replyMessage": {}
    }
  ]
}, 
{
  headers: {'Content-Type': 'application/json'}
})
  return Buffer.from(res.data.result.image, 'base64')
}

let handler = async (m, { conn, text }) => {
    try {
      let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text 
      if (!teks) throw 'Masukan Text'
      if (db.data.users[m.sender].premiumTime < 1) return m.reply('FITUR INI KHUSUS PREMIUM USER')
      let name = await conn.getName(m.sender)
      let avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_=> "https://telegra.ph/file/a4ec75f6ce8b2b565a3e3.png")
      let result = await quote(teks, name, avatar)
      let media = await sticker(result, false, "ArifzynXD - ", "SkyBot")
    await m.reply('*_Tunggu Sebentar Ya (〃＾▽＾〃)_*')
    conn.sendFile(m.chat, media, 'sticker.webp', '', m)
    } catch (e) {
      console.log(e)
      m.reply('Terjadi Kesalahan Saat Convert.')
  }
}
handler.command = ['qc']

export default handler