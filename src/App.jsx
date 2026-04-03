import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Presentation from './pages/Presentation.jsx'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Exercice from "./pages/Exercice.jsx";
import Matomo from "./components/common/Matomo.jsx";

const App = () => {
    return (
        <Router>
            <Matomo />
            <div className="min-h-screen flex flex-col bg-base-200">
                <Header />
                <main className="grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/exercice" element={<Exercice />} />
                        <Route path="/presentation" element={<Presentation />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App;