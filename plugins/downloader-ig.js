import { instagram } from '@xct007/frieren-scraper'
import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.room = conn.room ? conn.room: {}
    let id = 'instagram_' + m.sender
    if (!args[0]) return m.reply(`Masukan Urls!\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/Cq8o8QZupaE/?igshid=YmMyMTA2M2Y=`)
    if (!/https:\/\/www.instagram.com/i.test(args[0]) && !(id in conn.room)) return m.reply('Invalid Urls!')
    m.reply(wait)
    try {
        let data = await instagram.v1(args[0])
        if (data.length > 1) {
            conn.room[id] = {
                msg: await conn.sendFile(m.chat, data[0].url, false, `_Silahkan Ketik *${usedPrefix + command} <number>* Untuk Mendownload Sisa Foto Atau Video._ \n_Terdapat *${data.length} Hasil*_\n\n_Contoh :_\n${usedPrefix + command} 2`, m),
                result: data,
                waktu: setTimeout(() => {
                    conn.reply(m.chat, '_Waktu Memilih Habis_', conn.room[id].msg)
                    delete conn.room[id]
                }, 60000)
            }
        } else if (!isNaN(args[0]) && id in conn.room) {
            let { result } = conn.room[id]
            clearTimeout(conn.room[id].waktu)
            if (args[0] > result.length) return m.reply('Invalid Number')
            conn.room[id].msg = await conn.sendFile(m.chat, result[args[0] - 1].url, false, 'Ini Dia Kak', m)
            conn.room[id].waktu = setTimeout(() => {
                conn.reply(m.chat, '_Waktu Memilih Habis_', conn.room[id].msg)
                delete conn.room[id]
            }, 60000)
        } else {
            await conn.sendFile(m.chat, data[0].url, false, 'Ini Dia Kak', m)
        }
    } catch {
        let { media } = await igdl(args[0])
        if (media.length > 1) {
            conn.room[id] = {
                msg: await conn.sendFile(m.chat, media[0], false, `_Silahkan Ketik *${usedPrefix + command} <number>* Untuk Mendownload Sisa Foto Atau Video._ \n_Terdapat *${media.length} Hasil*_\n\n_Contoh :_\n${usedPrefix + command} 2`, m),
                result: media,
                waktu: setTimeout(() => {
                    conn.reply(m.chat, '_Waktu Memilih Habis_', conn.room[id].msg)
                    delete conn.room[id]
                }, 60000)
            }
        } else if (!isNaN(args[0]) && id in conn.room) {
            let { result } = conn.room[id]
            clearTimeout(conn.room[id].waktu)
            if (args[0] > result.length) return m.reply('Invalid Number')
            conn.room[id].msg = await conn.sendFile(m.chat, result[args[0] - 1], false, 'Ini Dia Kak', m)
            conn.room[id].waktu = setTimeout(() => {
                conn.reply(m.chat, '_Waktu Memilih Habis_', conn.room[id].msg)
                delete conn.room[id]
            }, 60000)
        } else {
            await conn.sendFile(m.chat, media[0], false, 'Ini Dia Kak', m)
        }
    }
}
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igmp4|igdownload|instagrammp4)$/i
handler.limit = true
export default handler

async function igdl(url) {
    try {
        let Get_Data = await axios.get(url)
        let Get_Result = Get_Data.data
        let $ = cheerio.load(Get_Result)
        let data = JSON.parse($('script').html())
        let media = []
        for (let x of [...data.image, ...data.video]) media.push(x.url || x.contentUrl)
        return {
            status: true,
            caption: data.articleBody,
            media,
            Credits: 'https://github.com/ohsyme/skrep/blob/main/src/scraper/downloader/instagram.js'
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}