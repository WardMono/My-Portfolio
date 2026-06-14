// src/components/Contact.jsx
import { useState, useEffect } from 'react'
import { SiGmail } from 'react-icons/si'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const contactData = [
    {
        Icon: SiGmail,
        label: 'Email',
        value: 'Deleonalfredmiguel@gmail.com',
        href: 'https://mail.google.com/mail/?view=cm&to=Deleonalfredmiguel@gmail.com&su=Reaching%20Out%20%E2%80%94%20Let%27s%20Connect&body=Hi%20Alfred%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0A%0A',
        brandColor: '#EA4335',
        target: '_self',
    },
    {
        Icon: FaLinkedin,
        label: 'LinkedIn',
        value: 'Alfred Miguel De Leon',
        href: 'https://www.linkedin.com/in/alfred-de-leon-b9b466278/',
        brandColor: '#0A66C2',
        target: '_blank',
    },
    {
        Icon: FaGithub,
        label: 'GitHub',
        value: 'Alfred Miguel De Leon',
        href: 'https://github.com/WardMono',
        brandColor: '#333333',
        target: '_blank',
    },
]

function ContactCard({ item, isMobile }) {
    const [hovered, setHovered] = useState(false)
    const { Icon, label, value, href, brandColor, target } = item

    return (
        <a
            href={href}
            target={target}
            rel="noreferrer"
            onMouseEnter={() => setHovered(true)
            }
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                border: `1px solid ${hovered ? brandColor : 'var(--card-border)'}`,
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                background: hovered ? brandColor : 'var(--card-bg)',
                transition: 'all 0.22s ease',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hovered ? `0 6px 20px ${brandColor}40` : 'none',
                minWidth: 0,
            }}
        >
            {/* Icon box */}
            < div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                background: hovered ? 'rgba(255,255,255,0.25)' : 'var(--tag-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.22s ease',
            }}>
                <Icon
                    size={18}
                    style={{
                        color: hovered ? '#ffffff' : 'var(--ink-muted)',
                        transition: 'color 0.22s ease',
                    }}
                />
            </div >

            {/* Text */}
            < div style={{ minWidth: 0 }}>
                <span style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: hovered ? 'rgba(255,255,255,0.75)' : 'var(--ink-faint)',
                    display: 'block',
                    transition: 'color 0.22s ease',
                    fontWeight: 500,
                }}>{label}</span>
                <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: hovered ? '#ffffff' : 'var(--ink)',
                    transition: 'color 0.22s ease',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}>{value}</span>
            </div >
        </a >
    )
}

function Contact() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 640)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return (
        <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            marginBottom: '1rem',
        }}>
            <p style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '0.2rem',
                lineHeight: 1.3,
            }}>Let's work together</p>

            <p style={{
                fontSize: '0.85rem',
                color: 'var(--ink-muted)',
                marginBottom: '1rem',
            }}>
                I'm open to freelance, collaborations, and full-time opportunities.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '0.6rem',
            }}>
                {contactData.map((item) => (
                    <ContactCard key={item.label} item={item} isMobile={isMobile} />
                ))}
            </div>
        </div>
    )
}

export default Contact