import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer footer-center p-6 bg-base-200 text-base-content">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-4xl mx-auto">
                <div className="text-sm text-base-content/70">
                    Orthophonie - {currentYear} &copy; Entraînez-vous à votre rythme
                </div>

                <div className="flex gap-6">
                    <Link to="/presentation" className="link link-hover text-sm">
                        Présentation
                    </Link>
                    <Link to="/exercice" className="link link-hover text-sm">
                        Exercices
                    </Link>
                </div>

                <div className="text-sm text-base-content/60">
                    Fait avec <Heart size={16} className="inline text-red-500" fill="currentColor" /> par{" "}
                    <a
                        href="https://leoderoin.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-hover text-sm text-red-400"
                    >
                        Leo Deroin
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer