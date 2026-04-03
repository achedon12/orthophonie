import { FileText, Heart, BookOpen, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        À propos
                    </h1>
                    <p className="text-lg text-base-content/70">
                        Votre plateforme d'entraînement en orthophonie
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                            <Heart className="text-primary" size={28} />
                            Notre Mission
                        </h2>
                        <p className="text-base-content/80 leading-relaxed">
                            Cette plateforme a été créée pour offrir aux candidats et professionnels de l'orthophonie
                            un espace d'entraînement complet et accessible. Notre objectif est de vous permettre de progresser
                            à votre rythme en travaillant l'expression orale, la prononciation et les réponses aux questions
                            d'entretien professionnels.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-3 flex items-center gap-2">
                                <Users className="text-secondary" size={24} />
                                Questions de Présentation
                            </h3>
                            <p className="text-base-content/80">
                                Entraînez-vous à répondre à des questions variées et aléatoires pour développer
                                vos compétences en expression orale et présentation personnelle.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-3 flex items-center gap-2">
                                <BookOpen className="text-accent" size={24} />
                                Exercices
                            </h3>
                            <p className="text-base-content/80">
                                Travaillez la prononciation, le langage et diverses compétences orthophoniques
                                grâce à nos exercices pratiques et ciblés.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                            <FileText className="text-primary" size={28} />
                            Ressources et Documents
                        </h2>

                        <p className="text-base-content/80 mb-6">
                            Cette plateforme s'appuie sur des ressources de référence pour vous offrir un entraînement
                            de qualité basé sur les pratiques professionnelles reconnues.
                        </p>

                        <div className="space-y-4">
                            <div className="border-l-4 border-primary pl-4 py-2">
                                <div className="flex items-start gap-3">
                                    <FileText className="text-primary mt-1 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-semibold text-base-content mb-1">
                                            Super guide avec un résumé des oraux sur plusieurs années
                                        </h4>
                                        <p className="text-sm text-base-content/70">
                                            Ce guide exhaustif compile les questions et sujets d'oraux issus de plusieurs années.
                                            Il offre une vue d'ensemble des thématiques récurrentes et des attentes des examinateurs.
                                            Une ressource essentielle pour la préparation aux épreuves orales.
                                        </p>
                                        <a
                                            href="/guides/Super guide avec un resumer des oraux sur plusieurs années.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 text-primary font-semibold hover:underline flex items-center gap-1 w-fit"
                                        >
                                            Consulter le document
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="border-l-4 border-secondary pl-4 py-2">
                                <div className="flex items-start gap-3">
                                    <FileText className="text-secondary mt-1 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-semibold text-base-content mb-1">
                                            Webinaire - Exercices et Épreuves Oral
                                        </h4>
                                        <p className="text-sm text-base-content/70">
                                            Ce document issu d'un webinaire spécialisé détaille les exercices pratiques
                                            et les formats des épreuves orales. Il combine conseils théoriques et exemples concrets
                                            pour vous préparer efficacement aux situations réelles.
                                        </p>
                                        <a
                                            href="/guides/Webinaire_exercices_epreuves_oral.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 text-secondary font-semibold hover:underline flex items-center gap-1 w-fit"
                                        >
                                            Consulter le document
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-linear-to-br from-primary/10 to-secondary/10 shadow-xl">
                    <div className="card-body text-center">
                        <h2 className="card-title justify-center text-2xl mb-4">Prêt à commencer ?</h2>
                        <p className="text-base-content/80 mb-6">
                            Utilisez les ressources disponibles et entraînez-vous dès maintenant pour progresser
                            vers vos objectifs professionnels en orthophonie.
                        </p>
                        <div className="card-actions justify-center flex-wrap gap-3">
                            <Link to="/presentation" className="btn btn-primary">
                                Questions de présentation
                            </Link>
                            <Link to="/exercise" className="btn btn-secondary">
                                Exercices
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-base-content/60">
                    <p>
                        Les documents PDF disponibles dans la section ressources constituent la base pédagogique
                        de cette plateforme d'entraînement.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About

