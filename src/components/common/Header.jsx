import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Mic, Sun, Moon } from 'lucide-react'

const Header = () => {
    const location = useLocation()
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const navLinks = [
        { path: '/', label: 'Accueil' },
        { path: '/presentation', label: 'Presentation' },
        { path: '/exercice', label: 'Exercice' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    {isMenuOpen && (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={isActive(link.path) ? 'active' : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <Mic size={24} className="text-primary" />
                    <span className="font-bold">Orthophonie</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={isActive(link.path) ? 'active font-semibold' : ''}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        {theme === 'light' ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-box w-52">
                        <li><button onClick={() => setTheme('light')} className="flex items-center gap-2"><Sun size={18} /> Light</button></li>
                        <li><button onClick={() => setTheme('dark')} className="flex items-center gap-2"><Moon size={18} /> Dark</button></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;