import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import About from './Pages/About.jsx';
import Courses from './Pages/Courses.jsx';
import Docs from './Pages/Docs.jsx';
import CoursePage from './Pages/CoursePage.jsx';
import CoursesNew from './Pages/CoursesNew.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CoursesNew />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);