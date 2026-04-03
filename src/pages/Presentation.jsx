import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Questions} from "../utils/Questions.js"
import Timer from "../components/common/Timer.jsx"
import CategoryMultiSelect from "../components/form/CategoryMultiSelect.jsx";

const Presentation = () => {

    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedCategories, setSelectedCategories] = useState([])

    const categories = Array.from(new Set(Questions.map(q => q.category))).sort()

    const getRandomQuestion = () => {
        const filteredQuestions = selectedCategories.length > 0
            ? Questions.filter(q => selectedCategories.includes(q.category))
            : Questions

        if (filteredQuestions.length === 0) {
            setCurrentQuestion(null)
            return null
        }

        const randomIndex = Math.floor(Math.random() * filteredQuestions.length)
        const newQuestion = filteredQuestions[randomIndex]
        setCurrentQuestion(newQuestion)
        return newQuestion
    }

    useEffect(() => {
        getRandomQuestion()
    }, [selectedCategories])

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const handleCategoriesChange = (newCategories) => {
        setSelectedCategories(newCategories)
    }

    const nextQuestion = () => {

        getRandomQuestion()
        setQuestionIndex(prev => prev + 1)
    }

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-3">
                        Questions de présentation
                    </h1>
                    <p className="text-base-content/70 text-lg">
                        Entraînez-vous à répondre à des questions aléatoires
                    </p>
                    <div className="mt-6">
                        <Timer />
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <div className="badge badge-secondary badge-outline mb-4 md:self-start self-center">
                            {currentQuestion.category}
                        </div>

                        <h2 className="card-title text-2xl md:text-3xl text-base-content mb-6 text-center">
                            {currentQuestion.question}
                        </h2>

                        <div className="card-actions justify-center flex-wrap gap-3">
                            <button onClick={nextQuestion} className="btn btn-primary">
                                Question suivante
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h3 className="card-title text-lg mb-4">Sélectionner les catégories</h3>
                        <CategoryMultiSelect
                            categories={categories}
                            selectedCategories={selectedCategories}
                            onChange={handleCategoriesChange}
                        />
                    </div>
                </div>

                <div className="text-center mt-6 text-sm text-base-content/60">
                    {questionIndex + 1} questions posées • Questions aléatoires à chaque fois
                </div>
            </div>
        </div>
    )
}

export default Presentation;