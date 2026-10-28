import Reveal from './Reveal'

const educationData = [
    {
        degree: 'Bachelor of Science in Information Technology',
        school: 'Arellano University, Pasay City',
        year: '2022 — 2026',
    },
    {
        degree: 'Senior High School — STEM',
        school: 'Olivarez College, Parañaque City',
        year: '2020 — 2022',
    },
]

function Education() {
    return (
        <Reveal className="w-full space-y-6">
            <p className="text-2xl font-light tracking-tight text-gray-900 dark:text-white sm:text-3xl">Education</p>
            <div className="space-y-7 sm:space-y-8">
                {educationData.map(edu => (
                    <div key={edu.degree} className="sm:grid sm:grid-cols-[160px_1fr] sm:gap-6">
                        <p className="mb-1 whitespace-nowrap text-xs font-medium text-gray-400 dark:text-gray-500 sm:mb-0 sm:pt-1">{edu.year}</p>
                        <div>
                            <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white sm:text-[17px]">{edu.degree}</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{edu.school}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Reveal>
    )
}

export default Education
