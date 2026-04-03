import { useState, useRef, useEffect } from 'react'

const CategoryMultiSelect = ({ categories, selectedCategories, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const containerRef = useRef(null)

    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleToggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            onChange(selectedCategories.filter(c => c !== category))
        } else {
            onChange([...selectedCategories, category])
        }
    }

    const handleSelectAll = () => {
        onChange(categories)
    }

    const handleClearAll = () => {
        onChange([])
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={containerRef} className="relative w-full">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 border border-base-300 rounded-lg cursor-pointer hover:bg-base-200 transition"
            >
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">
                        {selectedCategories.length === 0
                            ? 'Sélectionner des catégories...'
                            : `${selectedCategories.length} catégorie(s) sélectionnée(s)`}
                    </span>
                </div>
                <svg
                    className={`h-5 w-5 text-base-content/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-base-300">
                        <input
                            type="text"
                            placeholder="Rechercher une catégorie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-base-300 rounded-lg text-sm focus:outline-none focus:border-primary"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="flex gap-2 p-3 border-b border-base-300">
                        <button
                            onClick={handleSelectAll}
                            className="btn btn-sm btn-secondary flex-1 text-xs"
                        >
                            Tout sélectionner
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="btn btn-sm btn-secondary btn-outline flex-1 text-xs"
                        >
                            Tout désélectionner
                        </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer transition border-b border-base-300 last:border-b-0"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleToggleCategory(category)}
                                        className="checkbox checkbox-primary checkbox-sm"
                                    />
                                    <span className="text-sm flex-1">{category}</span>
                                    {selectedCategories.includes(category) && (
                                        <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </label>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-base-content/60">
                                Aucune catégorie trouvée
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoryMultiSelect

