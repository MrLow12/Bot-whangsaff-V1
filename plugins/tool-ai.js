import { Configuration, OpenAIApi } from "openai";
let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw `*Contoh:* \n${usedPrefix}ai Apa Itu Javascript`
    try {
        let configuration = new Configuration({
            apiKey: "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"
        });
        let openai = new OpenAIApi(configuration);
        let response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        m.reply(response.data.choices[0].text.trim())
    } catch (e) {
        throw '_Terjadi Error, Silahkan Coba Lagi_'
    }
}
handler.help = ['ai']
handler.tags = ['tools']
handler.command = /^(ai)$/i
handler.limit = true
handler.onlyprem = true
export default handler