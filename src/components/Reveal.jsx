import { motion } from 'framer-motion'

function Reveal({ children, className = '', id, delay = 0 }) {
    return (
        <motion.section
            id={id}
            className={className}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.section>
    )
}

export default Reveal
