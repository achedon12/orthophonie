import {Link} from 'react-router-dom'
import { MessageSquare, ClipboardList } from 'lucide-react'

const Home = () => {
    return (
        <div className="min-h-screen hero bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-base-content mb-4">Orthophonie</h1>
                    <p className="text-xl text-base-content/70 mb-12">
                        Entraînez-vous à votre rythme
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/presentation"
                            className="btn btn-primary btn-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                            Questions de présentation
                        </Link>

                        <Link
                            to="/exercise"
                            className="btn btn-secondary btn-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                            </svg>
                            Exercices
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-base-100 rounded-lg p-3 shadow-md">
                            <span className="font-semibold text-primary flex items-center gap-2">
                                <MessageSquare size={20} />
                                Présentation :
                            </span>
                            <p className="mt-1 text-base-content/70">Questions pour travailler l'expression orale et la présentation
                                personnelle</p>
                        </div>
                        <div className="bg-base-100 rounded-lg p-3 shadow-md">
                            <span className="font-semibold text-secondary flex items-center gap-2">
                                <ClipboardList size={20} />
                                Exercices :
                            </span>
                            <p className="mt-1 text-base-content/90">Exercices variés pour améliorer la prononciation et le langage</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home