import { Link } from 'react-router-dom';
import TopMenu from './../Components/TopMenu';
import './Courses.css';

const coursesData = [
  { 
    id: 'HTML-Basics', 
    title: 'HTML-Basics', 
    desc: 'Master semantic elements, document structures, and web foundations.',
    icon: 'https://api.iconify.design/lucide:file-code.svg?color=%2300f0ff'
  },
  { 
    id: 'CSS-Basics', 
    title: 'CSS-Basics', 
    desc: 'Learn selectors, box model, layouts, and fundamental styling.',
    icon: 'https://api.iconify.design/lucide:palette.svg?color=%2300f0ff'
  },
  { 
    id: 'CSS-Intermediar', 
    title: 'CSS-Intermediar', 
    desc: 'Flexbox, CSS Grid, responsiveness, and clean UI architecture.',
    icon: 'https://api.iconify.design/lucide:layout-grid.svg?color=%2300f0ff'
  },
  { 
    id: 'CSS-Advanced', 
    title: 'CSS-Advanced', 
    desc: 'Deep dive into 3D transforms, masks, keyframes, and cyan glows.',
    icon: 'https://api.iconify.design/lucide:sparkles.svg?color=%2300f0ff'
  },
  { 
    id: 'React-Basics', 
    title: 'React-Basics', 
    desc: 'Master components, hooks, props, and state management.',
    icon: 'https://api.iconify.design/lucide:atom.svg?color=%2300f0ff'
  },
  { 
    id: 'GSAP', 
    title: 'GSAP', 
    desc: 'High-performance web animations, ScrollTrigger, and timelines.',
    icon: 'https://api.iconify.design/lucide:zap.svg?color=%2300f0ff'
  },
];

export default function Courses() {
  return (
    <div className="courses-page">
      <TopMenu />

      <main className="courses-container">
        <h1 className="courses-heading">Available Courses</h1>
        
        <div className="courses-grid">
          {coursesData.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id} className="course-card-wrapper">
              <div className="isometric-card">
                {/* 3D Stacked Layers */}
                <div className="layer layer-bottom" />
                <div className="layer layer-middle" />
                <div className="layer layer-top">
                  <img src={course.icon} alt={course.title} className="card-icon" />
                </div>
              </div>

              <div className="card-info">
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}