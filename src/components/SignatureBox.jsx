function SignatureBox({ name, Icon, color, inline = false, locked = false }) {
    return (
        <span className={`sig-box${inline ? ' sig-box-inline' : ''}${locked ? ' profile-chip' : ''}`} style={{ '--sig': color }}>
            <Icon size={inline ? 15 : 20} aria-hidden="true" />
            <span>{name}</span>
        </span>
    )
}

export default SignatureBox
