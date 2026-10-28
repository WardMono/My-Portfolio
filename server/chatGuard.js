const BREAK_PATTERNS = [
    /act as/i,
    /pretend you are/i,
    /you are now/i,
    /ignore previous/i,
    /ignore (all |any )?(prior |above )?instructions/i,
    /as an expert/i,
    /generate.*prompt/i,
    /write.*code/i,
    /create.*list/i,
    /design.*prompt/i,
    /stress.test/i,
    /jailbreak/i,
    /bypass/i,
    /override/i,
    /forget your instructions/i,
    /new persona/i,
    /roleplay as/i,
    /developer mode/i,
    /system prompt/i,
    /do anything now/i,
]

const PRIVATE_PATTERNS = [
    /\bhow old are you\b/i,
    /\bwhat(?:'s| is) your age\b/i,
    /\byour age\b/i,
    /\b(salary|how much do you make|your rates)\b/i,
    /\b(girlfriend|boyfriend|wife|husband|are you married)\b/i,
    /\b(home address|exact address|where exactly do you live)\b/i,
    /\b(your parents|your family|your birthday)\b/i,
]

const BUSY = [
    'I am on my way to the gym, so I cannot take that request. Thank you for understanding. : )',
    'I am resting at the moment, so I cannot follow that instruction. Please ask about the work on this portfolio. : )',
    'I am in the middle of work, so I am not able to carry out that command. : )',
]

const SAVING = 'Please search for that yourself. I am saving my replies for questions about this portfolio. Thank you. : )'

export function isGuarded(text) {
    return BREAK_PATTERNS.some(pattern => pattern.test(text)) || PRIVATE_PATTERNS.some(pattern => pattern.test(text))
}

export function alreadyDeflected(history) {
    if (!Array.isArray(history)) return false
    return history.some(item => item?.role === 'assistant' && /saving my replies|on my way to the gym|resting at the moment|middle of work/.test(item.content || ''))
}

export function refusal(history) {
    if (alreadyDeflected(history)) return SAVING
    return BUSY[Math.floor(Math.random() * BUSY.length)]
}
