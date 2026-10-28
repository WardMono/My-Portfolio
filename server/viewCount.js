import fs from 'node:fs'
import path from 'node:path'

const FILE = path.resolve(process.cwd(), 'data', 'views.json')
const LIVE_MS = 40_000
const SEEN_CAP = 5000

let memory = null

function readFile() {
    try {
        return JSON.parse(fs.readFileSync(FILE, 'utf8'))
    } catch {
        return { views: 0, seen: [], live: {} }
    }
}

function load() {
    if (!memory) memory = readFile()
    if (!Array.isArray(memory.seen)) memory.seen = []
    if (!memory.live || typeof memory.live !== 'object') memory.live = {}
    if (typeof memory.views !== 'number') memory.views = 0
    return memory
}

function save(data) {
    memory = data
    try {
        fs.mkdirSync(path.dirname(FILE), { recursive: true })
        fs.writeFileSync(FILE, JSON.stringify(data))
    } catch {
        // Serverless disks are read-only. The in-memory count still updates this instance.
    }
}

function prune(data, now) {
    for (const [id, seenAt] of Object.entries(data.live)) {
        if (now - seenAt > LIVE_MS) delete data.live[id]
    }
}

export function snapshot() {
    const data = load()
    const now = Date.now()
    prune(data, now)
    save(data)
    return { views: data.views, live: Object.keys(data.live).length }
}

let queue = Promise.resolve()

function enqueue(task) {
    const run = queue.then(task, task)
    queue = run.then(() => {}, () => {})
    return run
}

export function recordView(sessionId, pagePath) {
    return enqueue(() => recordViewNow(sessionId, pagePath))
}

function recordViewNow(sessionId, pagePath) {
    const data = load()
    const now = Date.now()
    const id = String(sessionId || '').slice(0, 80)
    const page = String(pagePath || '/').slice(0, 120)

    if (id) {
        const key = `${id}|${page}`
        if (!data.seen.includes(key)) {
            data.views += 1
            data.seen.push(key)
            if (data.seen.length > SEEN_CAP) data.seen = data.seen.slice(-SEEN_CAP)
        }
        data.live[id] = now
    }

    prune(data, now)
    save(data)
    return { views: data.views, live: Object.keys(data.live).length }
}
