// src/components/About.jsx
function About() {
    return (
        <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}>
                <div>
                    <p style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        marginBottom: '0.2rem',
                        lineHeight: 1.3,
                        fontFamily: 'var(--font-display, inherit)',
                    }}>About</p>

                    <p style={{
                        fontSize: '0.92rem',
                        color: 'var(--ink-light)',
                        lineHeight: 1.75,
                        fontFamily: 'var(--font-body, inherit)',
                    }}>
                        I'm a BS Information Technology student at Arellano University, passionate about building clean,
                        functional web experiences. With a background spanning frontend, backend, and UI/UX design, I approach
                        every project with both technical precision and an eye for good design. I believe the best digital
                        products are ones that feel effortless to use.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About