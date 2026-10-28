export function readIp(req) {
    const forwarded = req.headers?.['x-forwarded-for'] || req.headers?.['x-real-ip'] || ''
    const raw = Array.isArray(forwarded) ? forwarded[0] : String(forwarded)
    const first = raw.split(',')[0].trim()
    if (first) return first.replace(/^::ffff:/, '')
    return String(req.socket?.remoteAddress || '').replace(/^::ffff:/, '')
}

export function isLocalIp(ip) {
    if (!ip) return true
    return ip === '::1'
        || ip === '127.0.0.1'
        || ip === '0.0.0.0'
        || ip.startsWith('192.168.')
        || ip.startsWith('10.')
        || /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
}

export async function locateVisitor(req) {
    const ip = readIp(req)
    if (isLocalIp(ip)) return { local: true, ip: ip || '' }
    try {
        const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
            signal: AbortSignal.timeout(2500),
        })
        const data = await res.json()
        if (!data || data.success === false) return { local: false, ip }
        return {
            local: false,
            ip: data.ip || ip,
            city: data.city || '',
            region: data.region || '',
            country: data.country || '',
            timezone: data.timezone?.id || '',
        }
    } catch {
        return { local: false, ip }
    }
}

export function locationPreface(info) {
    if (!info || info.local) {
        return 'Before I answer, this visit is from a local connection, so a public IP address and location are not available.'
    }
    const place = [info.city, info.region, info.country].filter(Boolean).join(', ')
    const where = place ? `from ${place}` : 'from a public network'
    const zone = info.timezone ? ` Your time zone is ${info.timezone}.` : ''
    return `Before I answer, you are viewing this portfolio ${where}. Your IP address is ${info.ip}.${zone}`
}
