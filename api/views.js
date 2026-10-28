import { recordView, snapshot } from '../server/viewCount.js'

export default async function handler(req, res) {
    if (req.method === 'GET') return res.status(200).json(snapshot())
    if (req.method !== 'POST') return res.status(405).end()

    const sessionId = req.body?.sessionId
    const pagePath = req.body?.path
    return res.status(200).json(await recordView(sessionId, pagePath))
}
