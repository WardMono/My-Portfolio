// src/data/projects.jsx
import feelbright from '../assets/feelbright.jpg'
import carserve from '../assets/carserve.jpg'
import pawfect from '../assets/pawfect.jpg'
import mindhaven from '../assets/mindhaven.jpg'
import chewybyte from '../assets/chewybyte.jpg'
import rodolfo from '../assets/rodolfo.jpg'
import quickquiz from '../assets/quickquiz.jpg'

export const projectsData = [
    {
        id: 'feelbright',
        name: 'FeelBright',
        tagline: 'Emotional Intelligence Assessment System',
        desc: 'A full-stack web app for assessing and improving emotional intelligence. Features user authentication, personalized assessments, progress tracking, resource articles, and a wellness dashboard.',
        tags: ['JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
        category: ['Full Stack', 'Platform', 'Dashboard'],
        image: feelbright,
        caseStudy: '/casestudies/feelbright',
    },
    {
        id: 'carserve',
        name: 'CarServe',
        tagline: 'Car Wash Booking Platform',
        desc: 'A professional car wash booking system for Metro Manila. Includes a complete admin dashboard and a user-facing booking flow — no registration required for quick bookings.',
        tags: ['HTML', 'CSS', 'JavaScript', 'System Design'],
        category: ['Full Stack', 'Booking', 'Dashboard'],
        link: 'https://car-serve-nu.vercel.app/',
        image: carserve,
    },
    {
        id: 'pawfect',
        name: 'Pawfect',
        tagline: 'Pet Adoption Matching App',
        desc: 'A React-based pet adoption platform where every paw finds its perfect match. Clean UI with listings, filtering, and an adoption flow designed with care.',
        tags: ['React', 'JavaScript', 'CSS'],
        category: ['Frontend', 'Platform'],
        link: 'https://pawfect-bay.vercel.app/',
        image: pawfect,
    },
    {
        id: 'mindhaven',
        name: 'MindHaven',
        tagline: 'Mental Wellness Platform',
        desc: 'A calm, wellness-focused web experience guiding users through their mental health journey with structured resources and a welcoming UI.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        category: ['Frontend', 'Platform'],
        link: 'https://mind-haven-teal.vercel.app/',
        image: mindhaven,
    },
    {
        id: 'chewbyte',
        name: 'ChewByte',
        tagline: 'Creative Branding & Web Design Studio',
        desc: 'A premium digital studio site built for a creative agency offering web design, branding, and logo identity services to clients. It showcases services and portfolio highlights with a clear path for potential clients to get in touch.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        category: ['Frontend', 'Landing Page'],
        link: 'https://chewy-byte.vercel.app/',
        image: chewybyte,
    },
    {
        id: 'rodolfopizza',
        name: 'Rodolfo Pizza',
        tagline: 'Restaurant Landing Page',
        desc: 'A vibrant, appetizing landing page for a pizza restaurant — showcasing menu highlights, brand personality, and a strong visual design.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        category: ['Frontend', 'Landing Page'],
        link: 'https://rodolfo-pizza.vercel.app/',
        image: rodolfo,
    },
    {
        id: 'boundtogether',
        name: 'Bound Together',
        tagline: '2D Cooperative Puzzle Game',
        desc: 'Lumi and Nous are trapped inside a dream — a surreal maze of puzzles, lurking monsters, and hidden paths. Work together to collect scattered fragments, find the key, and unlock the portal to the next level. If one falls, both fall.',
        tags: ['Godot 4.3', 'GDScript', 'JSON'],
        category: ['Game'],
        link: null,
        image: null,
    },
    {
        id: 'quickquiz',
        name: 'Quick Quiz',
        tagline: 'Interactive Quiz Learning Platform',
        desc: 'A school activity built around the Builder Design Pattern — a technique for constructing complex objects step by step. Quick Quiz applies this pattern to generate flexible, user-tailored quizzes with a modern, accessible UI.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Builder Pattern'],
        category: ['Frontend', 'Platform', 'Interactive'],
        link: 'https://quick-quiz-tan.vercel.app/',
        image: quickquiz,
    },
]