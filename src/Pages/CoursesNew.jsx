import { useRef } from 'react';
import { Link } from 'react-router-dom';
import TopMenu from './../Components/TopMenu';
import Footer from './../Components/Footer'
import './CoursesNew.css'

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

export default function CoursesNew() {
  const gridRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;

    gridRef.current.style.setProperty('--mx', `${e.clientX}px`);
    gridRef.current.style.setProperty('--my', `${e.clientY}px`);
  };

  const handleMouseLeave = () => {
    if (!gridRef.current) return;

    gridRef.current.style.setProperty('--mx', '-9999px');
    gridRef.current.style.setProperty('--my', '-9999px');
  };

  return (
    <section
      ref={gridRef}
      className="courses-grid"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="courses-content">
        <TopMenu />
        <h2 className='CourseMainTitle'>Courses</h2>
        <div className="NewCoursesGrid">
            {coursesData.map((courseNew) => (
                <Link to={`/courses/${courseNew.id}`} key={courseNew.id} className="NewCourseCard">
                <div className='NewIsometric-Cards'>
                    <div className='NewLayer NewLayerBottom'></div>
                    <div className='NewLayer NewLayerMiddle'></div>
                    <div className='NewLayer NewLayerTop'>
                        <img src={courseNew.icon} alt={courseNew.title} className='NewCardIcon' />
                    </div>
                </div>
                <div className='NewCardInfo'>
                    <h3>{courseNew.title}</h3>
                    <p>{courseNew.desc}</p>
                </div>
                </Link>
            ))}
        </div>
        <Footer/>
      </div>
    </section>
  );
}

