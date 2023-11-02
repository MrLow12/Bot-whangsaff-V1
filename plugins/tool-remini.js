import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Fotonya Mana? Reply gambar yg gk ada button aja'
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    m.reply(wait)
    let load = await q.download()
    let url = await uploadImage(load)
    let img = API('arif', '/api/others/remini', { url: url }, 'apikey')
    conn.sendFile(m.chat, img, '', 'Ini Dia Kak', m)
}
handler.help = ['remini']
handler.tags = ['tools']
handler.command = /^(remini)$/i
handler.limit = true
export default handler