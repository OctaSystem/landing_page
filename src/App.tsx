import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./screens/home.tsx";
import Contact from "./screens/contact.tsx";


export default function App() {
    return (
        <Router>
            <div className="min-h-screen selection:bg-primary selection:text-white">
                <Navbar/>

                <main className="w-full max-w-full overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                    </Routes>
                </main>

                <Footer/>
            </div>
        </Router>
    );
}

