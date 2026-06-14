const TelegramBot = require('node-telegram-bot-api')

async function sendTelegramMessage(bot, chatId, text) {
    const MAX = 4096
    const chunks = []
    for (let i = 0; i < text.length; i += MAX) chunks.push(text.slice(i, i + MAX))
    for (const chunk of chunks) {
        await bot.sendMessage(chatId, chunk, { parse_mode: 'Markdown' })
    }
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end()

    const { messages, startedAt, endedAt, sessionId } = req.body
    if (!messages || messages.length === 0) return res.json({ ok: true })

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false })
    const chatId = process.env.TELEGRAM_CHAT_ID

    const userMessages = messages.filter(m => m.role === 'user')
    const botMessages = messages.filter(m => m.role === 'assistant')

    const formatTime = (ts) => {
        if (!ts) return 'N/A'
        return new Date(ts).toLocaleString('en-PH', {
            timeZone: 'Asia/Manila',
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
        })
    }

    const duration = startedAt && endedAt
        ? Math.round((endedAt - startedAt) / 1000 / 60)
        : 'N/A'

    const fullText = userMessages.map(m => m.content).join(' ').toLowerCase()
    const topics = []
    if (/hire|freelance|collaborat|project|work with|available/.test(fullText)) topics.push('Hiring / Collaboration Interest')
    if (/skill|stack|technolog|react|node|postgres/.test(fullText)) topics.push('Skills & Tech Stack')
    if (/project|feelbright|carserve|pawfect|mindhaven|chewbyte/.test(fullText)) topics.push('Projects')
    if (/contact|email|reach/.test(fullText)) topics.push('Contact Request')
    if (/resume|cv/.test(fullText)) topics.push('Resume Request')
    if (/student|learning|beginner|struggle/.test(fullText)) topics.push('Student / Learning')
    if (topics.length === 0) topics.push('General Inquiry')

    let report = `
📊 *DAILY CONVERSATION REPORT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *REPORT OVERVIEW*
- Session ID: \`${sessionId ?? 'N/A'}\`
- Report Generated: ${formatTime(endedAt ?? Date.now())}
- Conversation Started: ${formatTime(startedAt)}
- Conversation Ended: ${formatTime(endedAt)}
- Duration: ${duration} minute(s)

📈 *CONVERSATION STATISTICS*
- Total Messages: ${messages.length}
- User Messages: ${userMessages.length}
- Bot Replies: ${botMessages.length}

🏷️ *TOPICS DETECTED*
${topics.map(t => `• ${t}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 *FULL CONVERSATION TRANSCRIPT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`
    messages.forEach((m, i) => {
        const role = m.role === 'user' ? '👤 USER' : '🤖 BOT'
        report += `*[${i + 1}] ${role}*\n🕐 ${formatTime(m.timestamp)}\n${m.content}\n\n`
    })

    report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n_End of Report — Alfred Miguel De Leon Portfolio_`

    try {
        await sendTelegramMessage(bot, chatId, report)
        return res.json({ ok: true })
    } catch (err) {
        console.error('Telegram error:', err)
        return res.status(500).json({ error: 'Telegram error' })
    }
}