import { useState } from 'react'
import { Link } from 'react-router-dom'

function Arrow() {
    return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    )
}

function AccordionGallery({ items }) {
    const [active, setActive] = useState(null)

    return (
        <div
            className={`accordion-gallery rounded-xl${active !== null ? ' has-open' : ''}`}
            role="list"
            aria-label="Selected work"
            onMouseLeave={() => setActive(null)}
        >
            {items.map((item, index) => {
                const open = index === active
                return (
                    <div
                        key={item.id}
                        className={`ag-panel ${open ? 'is-open' : ''}`}
                        role="listitem"
                        tabIndex={0}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onClick={() => setActive(index)}
                    >
                        <span className="ag-panel__frame">
                            <span className="ag-panel__media">
                                <img src={item.image} alt={item.alt || ''} draggable="false" />
                            </span>
                            <span className="ag-panel__overlay" aria-hidden="true" />
                        </span>
                        <span className="ag-panel__collapsed" aria-hidden={open}>
                            {item.collapsedLabel}
                            <br />
                            <span className="font-normal tracking-[0.12em] opacity-75">{item.collapsedCategory}</span>
                        </span>
                        <span className="ag-panel__content" aria-hidden={!open}>
                            <span className="ag-panel__category">{item.category}</span>
                            <span className="ag-panel__title">{item.title}</span>
                            {item.subtitle && <span className="ag-panel__subtitle">{item.subtitle}</span>}
                            {item.href && (
                                item.href.startsWith('/') ? (
                                    <Link className="ag-panel__cta" to={item.href} onClick={(e) => e.stopPropagation()}>
                                        <span>{item.cta}</span>
                                        <Arrow />
                                    </Link>
                                ) : (
                                    <a className="ag-panel__cta" href={item.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <span>{item.cta}</span>
                                        <Arrow />
                                    </a>
                                )
                            )}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default AccordionGallery
