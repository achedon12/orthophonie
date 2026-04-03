import {useEffect, useState} from 'react'
import {
    AlertCircle,
    ArrowRight,
    BookOpen,
    Bug,
    CheckCircle,
    CheckCircle2,
    ChevronRight,
    Lightbulb,
    PenTool,
    RotateCcw,
    Target,
    Volume2,
    VolumeX
} from 'lucide-react'
import {Exercices, getExerciceTypeDescription, words} from '../utils/Exercices'
import Timer from '../components/common/Timer'

const useSpeechSynthesis = () => {
    const [voices, setVoices] = useState([]);
    const [frenchVoices, setFrenchVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speechParams, setSpeechParams] = useState(() => {
        const saved = localStorage.getItem('speechParams');
        return saved ? JSON.parse(saved) : {
            rate: 0.85,
            pitch: 1.05,
            volume: 1.0
        };
    });

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);

            const french = availableVoices.filter(voice =>
                voice.lang === 'fr-FR' || voice.lang === 'fr-CA' || voice.lang === 'fr-BE' || voice.lang === 'fr-CH'
            );

            const sortedFrenchVoices = french.sort((a, b) => {
                const getPriority = (voice) => {
                    const name = voice.name.toLowerCase();
                    if (name.includes('google')) return 1;
                    if (name.includes('microsoft') || name.includes('natural')) return 2;
                    if (name.includes('premium') || name.includes('high quality')) return 3;
                    if (name.includes('samantha') || name.includes('marie') || name.includes('julie')) return 4;
                    if (name.includes('claire') || name.includes('audrey') || name.includes('léa')) return 5;
                    if (name.includes('thomas') || name.includes('denis')) return 6;
                    return 7;
                };

                const priorityA = getPriority(a);
                const priorityB = getPriority(b);

                if (priorityA !== priorityB) return priorityA - priorityB;
                return a.name.localeCompare(b.name);
            });

            setFrenchVoices(sortedFrenchVoices);

            const savedVoiceName = localStorage.getItem('preferredVoice');
            let voiceToUse = null;

            if (savedVoiceName) {
                voiceToUse = sortedFrenchVoices.find(v => v.name === savedVoiceName);
            }

            if (!voiceToUse && sortedFrenchVoices.length > 0) {
                voiceToUse = sortedFrenchVoices[0];
            }

            setSelectedVoice(voiceToUse);
        };

        if (window.speechSynthesis.getVoices().length > 0) {
            loadVoices();
        }

        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const updateSpeechParams = (newParams) => {
        setSpeechParams(prev => {
            const updated = {...prev, ...newParams};
            localStorage.setItem('speechParams', JSON.stringify(updated));
            return updated;
        });
    };

    const changeVoice = (voice) => {
        setSelectedVoice(voice);
        localStorage.setItem('preferredVoice', voice.name);
    };

    return {frenchVoices, selectedVoice, changeVoice, speechParams, updateSpeechParams};
};

export default function Exercise() {
    const [currentStep, setCurrentStep] = useState('menu')
    const [serie, setSerie] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [memorizedWords, setMemorizedWords] = useState([])
    const [userAnswer, setUserAnswer] = useState('')
    const [isCorrect, setIsCorrect] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [showBugModal, setShowBugModal] = useState(false)
    const [bugDescription, setBugDescription] = useState('')
    const [bugSubmitting, setBugSubmitting] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [showVoiceSettings, setShowVoiceSettings] = useState(false)

    const {frenchVoices, selectedVoice, changeVoice, speechParams, updateSpeechParams} = useSpeechSynthesis()

    const generateNewSerie = () => {
        const shuffled = [...Exercices].sort(() => Math.random() - 0.5)
        const selectedExercices = shuffled.slice(0, 20)

        const shuffledWords = [...words].sort(() => Math.random() - 0.5)
        const wordsToMemorize = shuffledWords.slice(0, 5)
        setMemorizedWords(wordsToMemorize)

        const completeSerie = [
            {
                id: 0,
                type: 'memorization',
                description: 'Mémorisez la série de mots proposés et redonnez le à la fin de votre série',
                words: wordsToMemorize,
                content: wordsToMemorize.join(' ')
            },
            ...selectedExercices.map((ex, idx) => ({
                ...ex,
                type: 'exercise',
                questionNumber: idx + 1
            })),
            {
                id: selectedExercices.length + 1,
                type: 'verification',
                description: 'Restituez les mots mémorisés au début dans l\'ordre et sans accent',
                expectedAnswer: normalizeWords(wordsToMemorize).join(' ')
            }
        ]

        setSerie(completeSerie)
        setCurrentQuestionIndex(0)
    }

    const normalizeWords = (words) => {
        return words.map(word =>
            word
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
        )
    }

    const checkAnswer = () => {
        const userNormalized = normalizeWords(userAnswer.split(/\s+/)).filter(w => w.length > 0).join(' ')
        const expected = memorizedWords
            .map(word =>
                word
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
            )
            .join(' ')

        const correct = userNormalized === expected
        setIsCorrect(correct)
    }

    const nextQuestion = () => {
        setUserAnswer('')
        setIsCorrect(null)
        setShowAnswer(false)
        if (currentQuestionIndex < serie.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            setCurrentStep('results')
        }
    }

    const handleStartGeneration = () => {
        setCurrentStep('generation')
        setTimeout(() => {
            generateNewSerie()
            setCurrentStep('session')
        }, 2000)
    }

    const handleNewSerie = () => {
        setCurrentStep('menu')
        setCurrentQuestionIndex(0)
        setUserAnswer('')
        setIsCorrect(null)
        setShowAnswer(false)
    }

    const submitBugReport = async () => {
        if (!bugDescription.trim()) {
            alert('Veuillez décrire le bug')
            return
        }

        setBugSubmitting(true)
        try {
            const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL

            let questionNumber = 'N/A'
            if (currentQuestion?.type === 'exercise') {
                questionNumber = `${currentQuestion.questionNumber}/20`
            } else if (currentQuestion?.type === 'memorization') {
                questionNumber = '0 (Mémorisation)'
            } else if (currentQuestion?.type === 'verification') {
                questionNumber = `${serie.length} (Vérification)`
            }

            const embed = {
                title: '🐛 Rapport de Bug',
                description: bugDescription,
                fields: [
                    {
                        name: 'Numéro de Question',
                        value: questionNumber,
                        inline: true
                    },
                    {
                        name: 'Type de Question',
                        value: currentQuestion?.type || 'Menu',
                        inline: true
                    },
                    {
                        name: 'Étape',
                        value: currentStep,
                        inline: true
                    },
                    {
                        name: 'Progression',
                        value: `${currentQuestionIndex + 1} / ${serie.length}`,
                        inline: true
                    }
                ],
                color: 16711680,
                timestamp: new Date().toISOString()
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({embeds: [embed]})
            })

            if (!response.ok) {
                console.error('Erreur lors de l\'envoi du bug')
                alert('Erreur lors de l\'envoi du rapport. Veuillez réessayer.')
                setBugSubmitting(false)
                return
            }

            alert('Merci! Votre rapport de bug a été envoyé.')
            setBugDescription('')
            setShowBugModal(false)
            setBugSubmitting(false)
        } catch (error) {
            console.error('Erreur lors de l\'envoi du bug:', error)
            alert('Erreur lors de l\'envoi du rapport. Veuillez réessayer.')
            setBugSubmitting(false)
        }
    }

    const currentQuestion = serie[currentQuestionIndex]
    const progressPercentage = serie.length > 0 ? ((currentQuestionIndex + 1) / serie.length) * 100 : 0

    const speakQuestion = (text) => {
        speechSynthesis.cancel()

        if (!text || text.trim() === '') return

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'fr-FR'
        utterance.rate = speechParams.rate
        utterance.pitch = speechParams.pitch
        utterance.volume = speechParams.volume

        if (selectedVoice) {
            utterance.voice = selectedVoice
        }

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        speechSynthesis.speak(utterance)
    }

    const stopSpeaking = () => {
        speechSynthesis.cancel()
        setIsSpeaking(false)
    }

    const getVoiceTypeIcon = (voiceName) => {
        const name = voiceName.toLowerCase();
        if (name.includes('google')) return '🤖';
        if (name.includes('microsoft')) return '💻';
        if (name.includes('natural')) return '🌟';
        if (name.includes('premium')) return '⭐';
        if (name.includes('samantha') || name.includes('marie') || name.includes('julie')) return '👩';
        if (name.includes('thomas') || name.includes('denis')) return '👨';
        if (name.includes('claire') || name.includes('audrey') || name.includes('léa')) return '👩‍🏫';
        return '🎤';
    };

    const getVoiceDescription = (voiceName) => {
        const name = voiceName.toLowerCase();
        if (name.includes('google')) return 'Voix Google - Naturelle';
        if (name.includes('microsoft')) return 'Voix Microsoft - Claire';
        if (name.includes('natural')) return 'Voix Naturelle - Haute qualité';
        if (name.includes('premium')) return 'Voix Premium - Excellente';
        if (name.includes('samantha')) return 'Voix Samantha - Douce';
        if (name.includes('marie')) return 'Voix Marie - Élégante';
        if (name.includes('julie')) return 'Voix Julie - Dynamique';
        if (name.includes('thomas')) return 'Voix Thomas - Professeur';
        if (name.includes('denis')) return 'Voix Denis - Pédagogue';
        if (name.includes('claire')) return 'Voix Claire - Enseignante';
        if (name.includes('audrey')) return 'Voix Audrey - Articulée';
        if (name.includes('léa')) return 'Voix Léa - Jeune';
        return 'Voix française';
    };

    useEffect(() => {
        if (currentStep === 'session' && currentQuestion) {
            let textToSpeak = ''

            if (currentQuestion.type === 'memorization') {
                textToSpeak = `Mémorisation. ${currentQuestion.content}`
            } else if (currentQuestion.type === 'exercise') {
                const exerciseTitle = getExerciceTypeDescription(currentQuestion.exerciceTypeId)
                textToSpeak = `Exercice ${currentQuestion.questionNumber} sur 20. ${exerciseTitle}. ${currentQuestion.description}`
            } else if (currentQuestion.type === 'verification') {
                textToSpeak = 'Restitution des mots mémorisés. Restituez les mots mémorisés au début dans l\'ordre et sans accent.'
            }

            const timer = setTimeout(() => {
                speakQuestion(textToSpeak)
            }, 300)

            return () => {
                clearTimeout(timer)
                speechSynthesis.cancel()
                setIsSpeaking(false)
            }
        }
    }, [currentQuestionIndex, currentStep, currentQuestion])

    return (
        <div className="min-h-screen bg-base-200">
            <div className="bg-base-100 shadow-md top-0 z-10">
                <div
                    className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3 flex-1 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                        {currentStep === 'session' && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <div className="text-xs sm:text-sm text-base-content/70 whitespace-nowrap">
                                    Q. {currentQuestionIndex + 1}/{serie.length}
                                </div>
                                <div className="w-full sm:w-32 bg-base-300 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{width: `${progressPercentage}%`}}
                                    />
                                </div>
                                <div className="block text-center">
                                    <Timer/>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative ml-auto">
                        <button
                            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                            className="btn btn-primary btn-sm gap-2"
                            title="Paramètres vocaux français"
                        >
                            <Volume2 size={18}/>
                            <span className="hidden sm:inline text-xs">Voix française</span>
                        </button>

                        {showVoiceSettings && (
                            <div
                                className="absolute right-0 mt-2 w-96 max-w-[90vw] bg-base-100 rounded-lg shadow-xl border border-base-200 z-20 max-h-[80vh] overflow-y-auto sm:max-h-none sm:overflow-visible">
                                <div className="p-4 space-y-4">
                                    <div className="flex items-center justify-between border-b border-base-200 pb-2">
                                        <h3 className="font-bold text-base">🇫🇷 Voix Françaises</h3>
                                        <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                                          {frenchVoices.length} voix disponible{frenchVoices.length > 1 ? 's' : ''}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold mb-2 block">
                                            Choisissez votre professeur virtuel
                                        </label>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {frenchVoices.map((voice, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        changeVoice(voice);
                                                        setTimeout(() => {
                                                            speakQuestion("Bonjour, je serai votre professeur pour cet exercice.");
                                                        }, 100);
                                                    }}
                                                    className={`w-full text-left p-3 rounded-lg transition-all ${
                                                        selectedVoice?.name === voice.name
                                                            ? 'bg-primary/20 border-2 border-primary'
                                                            : 'bg-base-200 hover:bg-base-300 border-2 border-transparent'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className="text-lg">{getVoiceTypeIcon(voice.name)}</span>
                                                            <span className="font-medium text-sm">{voice.name}</span>
                                                        </div>
                                                        {selectedVoice?.name === voice.name && (
                                                            <CheckCircle size={16} className="text-primary"/>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-base-content/60 ml-6">
                                                        {getVoiceDescription(voice.name)}
                                                    </div>
                                                    <div className="text-xs text-base-content/40 ml-6 mt-1">
                                                        {voice.lang === 'fr-FR' ? '🇫🇷 Français standard' :
                                                            voice.lang === 'fr-CA' ? '🇨🇦 Français canadien' :
                                                                voice.lang === 'fr-BE' ? '🇧🇪 Français belge' :
                                                                    '🇨🇭 Français suisse'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedVoice && (
                                        <div className="bg-primary/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Volume2 size={14} className="text-primary"/>
                                                <span className="text-xs font-semibold">Aperçu de la voix</span>
                                            </div>
                                            <button
                                                onClick={() => speakQuestion("Bonjour! Voici un aperçu de ma voix. Je lirai tous les exercices pour vous aider à apprendre.")}
                                                className="btn btn-primary btn-xs w-full gap-1"
                                            >
                                                <Volume2 size={12}/>
                                                Tester la voix
                                            </button>
                                        </div>
                                    )}

                                    <div className="border-t border-base-200 pt-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs font-semibold">🇫🇷 Débit de parole</label>
                                            <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                                                {speechParams.rate < 0.8 ? 'Lent' : speechParams.rate > 1.2 ? 'Rapide' : 'Normal'}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="1.5"
                                            step="0.05"
                                            value={speechParams.rate}
                                            onChange={(e) => updateSpeechParams({rate: parseFloat(e.target.value)})}
                                            className="range range-sm w-full"
                                        />
                                        <div className="flex justify-between text-xs text-base-content/50 mt-1">
                                            <span>🐢 Plus lent (pédagogique)</span>
                                            <span>🐰 Plus rapide</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs font-semibold">🎵 Hauteur de voix</label>
                                            <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                            {speechParams.pitch < 0.9 ? 'Grave' : speechParams.pitch > 1.1 ? 'Aigu' : 'Normal'}
                          </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="1.5"
                                            step="0.05"
                                            value={speechParams.pitch}
                                            onChange={(e) => updateSpeechParams({pitch: parseFloat(e.target.value)})}
                                            className="range range-sm w-full"
                                        />
                                        <div className="flex justify-between text-xs text-base-content/50 mt-1">
                                            <span>👨‍🏫 Plus grave (professeur)</span>
                                            <span>👩‍🏫 Plus aigu (enseignante)</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs font-semibold">🔊 Volume</label>
                                            <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                            {speechParams.volume === 0 ? 'Muet' :
                                speechParams.volume < 0.3 ? 'Faible' :
                                    speechParams.volume < 0.7 ? 'Moyen' : 'Fort'}
                          </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={speechParams.volume}
                                            onChange={(e) => updateSpeechParams({volume: parseFloat(e.target.value)})}
                                            className="range range-sm w-full"
                                        />
                                    </div>

                                    <button
                                        onClick={() => setShowVoiceSettings(false)}
                                        className="btn btn-ghost btn-sm w-full mt-2"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {currentStep === 'menu' && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Target className="w-10 h-10 text-primary"/>
                                </div>
                            </div>
                            <h2 className="card-title text-3xl justify-center mb-4">Commencer un entraînement</h2>
                            <p className="text-base-content/70 mb-8 max-w-md mx-auto">
                                Une série de 20 exercices aléatoires + une question de mémorisation pour tester votre
                                progression.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleStartGeneration}
                                    className="btn btn-primary btn-lg gap-2"
                                >
                                    Démarrer la série
                                    <ArrowRight size={20}/>
                                </button>
                            </div>
                            <div className="mt-8 pt-8 border-t border-base-200">
                                <div className="flex flex-wrap justify-center gap-4 text-sm text-base-content/60">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-success"></div>
                                        <span>20 exercices</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-info"></div>
                                        <span>Mémorisation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-warning"></div>
                                        <span>Vérification finale</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 'generation' && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center py-16">
                            <div className="flex justify-center mb-6">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                            </div>
                            <h2 className="text-2xl font-bold text-base-content mb-2">
                                Génération de votre série
                            </h2>
                            <p className="text-base-content/70">Préparation des questions...</p>
                        </div>
                    </div>
                )}

                {currentStep === 'session' && currentQuestion && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex justify-between items-start mb-6 pb-4 border-b border-base-200">
                                <div>
                                    <div className="badge badge-primary badge-lg mb-2 flex items-center gap-2">
                                        {currentQuestion.type === 'memorization' && (
                                            <>
                                                <PenTool size={16}/>
                                                Mémorisation
                                            </>
                                        )}
                                        {currentQuestion.type === 'exercise' && (
                                            <>
                                                <Target size={16}/>
                                                Exercise {currentQuestion.questionNumber}/20
                                            </>
                                        )}
                                        {currentQuestion.type === 'verification' && (
                                            <>
                                                <CheckCircle2 size={16}/>
                                                Vérification finale
                                            </>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold text-base-content">
                                        {currentQuestion.type === 'memorization' && 'Mémorisez ces mots'}
                                        {currentQuestion.type === 'exercise' && getExerciceTypeDescription(currentQuestion.exerciceTypeId)}
                                        {currentQuestion.type === 'verification' && 'Restitution des mots'}
                                    </h2>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            let textToSpeak = ''
                                            if (currentQuestion.type === 'memorization') {
                                                textToSpeak = `Mémorisation. ${currentQuestion.content}`
                                            } else if (currentQuestion.type === 'exercise') {
                                                const exerciseTitle = getExerciceTypeDescription(currentQuestion.exerciceTypeId)
                                                textToSpeak = `Exercice ${currentQuestion.questionNumber} sur 20. ${exerciseTitle}. ${currentQuestion.description}`
                                            } else if (currentQuestion.type === 'verification') {
                                                textToSpeak = 'Restitution des mots mémorisés. Restituez les mots mémorisés au début dans l\'ordre et sans accent.'
                                            }
                                            isSpeaking ? stopSpeaking() : speakQuestion(textToSpeak)
                                        }}
                                        className={`btn btn-ghost btn-circle btn-sm ${isSpeaking ? 'text-primary' : 'text-base-content/50'} hover:text-primary`}
                                        title={isSpeaking ? 'Arrêter la lecture' : 'Relire la question'}
                                    >
                                        {isSpeaking ? <VolumeX size={18}/> : <Volume2 size={18}/>}
                                    </button>
                                    <button
                                        onClick={() => setShowBugModal(true)}
                                        className="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-error"
                                        title="Signaler un bug"
                                    >
                                        <Bug size={18}/>
                                    </button>
                                </div>
                            </div>

                            {currentQuestion.type === 'memorization' && (
                                <div className="space-y-6">
                                    <p className="text-base-content/80">{currentQuestion.description}</p>
                                    <div className="bg-primary/10 rounded-xl p-8 text-center select-none"
                                         onCopy={(e) => e.preventDefault()}
                                         onPaste={(e) => e.preventDefault()}
                                         onCut={(e) => e.preventDefault()}
                                         onSelectCapture={(e) => e.preventDefault()}
                                    >
                                        <p className="text-2xl md:text-3xl font-bold text-primary select-none pointer-events-none">
                                            {currentQuestion.content}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={nextQuestion}
                                            className="btn btn-primary gap-2"
                                        >
                                            Continuer
                                            <ChevronRight size={18}/>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentQuestion.type === 'exercise' && (
                                <div className="space-y-6">
                                    <div className="bg-base-200 rounded-xl p-6">
                                        {currentQuestion.imageUrl ? (
                                            <img
                                                src={currentQuestion.imageUrl}
                                                alt="Exercise"
                                                className="w-full max-h-96 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-base-content text-lg whitespace-pre-wrap">
                                                {currentQuestion.description}
                                            </p>
                                        )}
                                    </div>

                                    {showAnswer && (
                                        <div className="alert alert-info shadow-lg">
                                            <Lightbulb className="w-5 h-5"/>
                                            <div>
                                                <h3 className="font-bold">Réponse :</h3>
                                                <p className="whitespace-pre-wrap">{currentQuestion.response}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => setShowAnswer(!showAnswer)}
                                            className="btn btn-outline gap-2"
                                        >
                                            <Lightbulb size={18}/>
                                            {showAnswer ? 'Masquer la réponse' : 'Afficher la réponse'}
                                        </button>
                                        <button
                                            onClick={nextQuestion}
                                            className="btn btn-primary gap-2 ml-auto"
                                        >
                                            Question suivante
                                            <ChevronRight size={18}/>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentQuestion.type === 'verification' && (
                                <div className="space-y-6">
                                    <p className="text-base-content/80">{currentQuestion.description}</p>

                                    <div className="form-control">
                    <textarea
                        value={userAnswer}
                        onChange={(e) => {
                            setUserAnswer(e.target.value)
                            setIsCorrect(null)
                        }}
                        placeholder="Entrez les mots mémorisés dans l'ordre..."
                        className="textarea textarea-bordered h-32"
                        disabled={isCorrect !== null}
                    />
                                    </div>

                                    {showAnswer && (
                                        <div className="alert alert-warning shadow-lg">
                                            <BookOpen className="w-5 h-5"/>
                                            <div>
                                                <h3 className="font-bold">Réponse attendue :</h3>
                                                <p>{currentQuestion.expectedAnswer}</p>
                                            </div>
                                        </div>
                                    )}

                                    {isCorrect === null && (
                                        <div className="flex flex-wrap gap-4">
                                            <button
                                                onClick={checkAnswer}
                                                className="btn btn-success gap-2"
                                            >
                                                <CheckCircle size={18}/>
                                                Vérifier ma réponse
                                            </button>
                                            <button
                                                onClick={() => setShowAnswer(!showAnswer)}
                                                className="btn btn-outline gap-2"
                                            >
                                                <Lightbulb size={18}/>
                                                Voir la réponse
                                            </button>
                                        </div>
                                    )}

                                    {isCorrect !== null && (
                                        <div>
                                            <div
                                                className={`alert shadow-lg mb-6 ${isCorrect ? 'alert-success' : 'alert-error'}`}>
                                                {isCorrect ? (
                                                    <CheckCircle className="w-5 h-5"/>
                                                ) : (
                                                    <AlertCircle className="w-5 h-5"/>
                                                )}
                                                <div>
                                                    <h3 className="font-bold">{isCorrect ? 'Correct !' : 'Incorrect'}</h3>
                                                    {!isCorrect && (
                                                        <p>Attendu : {currentQuestion.expectedAnswer}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleNewSerie}
                                                className="btn btn-primary gap-2"
                                            >
                                                <RotateCcw size={18}/>
                                                Nouvelle série
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 'results' && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center py-12">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-success"/>
                                </div>
                            </div>
                            <h2 className="card-title text-3xl justify-center mb-4">Série terminée !</h2>
                            <p className="text-base-content/70 mb-8">
                                Félicitations ! Vous avez complété tous les exercices.
                            </p>
                            <button
                                onClick={handleNewSerie}
                                className="btn btn-primary btn-lg gap-2"
                            >
                                <RotateCcw size={20}/>
                                Nouvelle série
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showBugModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <div className="flex items-center gap-3 mb-4">
                            <Bug className="text-error" size={24}/>
                            <h3 className="font-bold text-lg">Signaler un bug</h3>
                        </div>
                        <p className="text-base-content/70 mb-4">
                            Décrivez le problème rencontré pour nous aider à améliorer l'application.
                        </p>
                        <textarea
                            value={bugDescription}
                            onChange={(e) => setBugDescription(e.target.value)}
                            placeholder="Décrivez le bug ici..."
                            className="textarea textarea-bordered w-full h-32 mb-4"
                        />
                        <div className="modal-action">
                            <button
                                onClick={() => setShowBugModal(false)}
                                className="btn"
                                disabled={bugSubmitting}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={submitBugReport}
                                className="btn btn-error"
                                disabled={bugSubmitting}
                            >
                                {bugSubmitting ? 'Envoi...' : 'Envoyer'}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowBugModal(false)}></div>
                </div>
            )}
        </div>
    )
}