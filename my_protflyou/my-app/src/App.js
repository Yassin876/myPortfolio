import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './padgs/Navbar';
import AboutMe from './padgs/abuotme';
import Skills from './padgs/skills';
import Projects from './padgs/projects';
import ProjectCategory from './padgs/ProjectCategory';
import Contact from './padgs/Contact';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:type" element={<ProjectCategory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
