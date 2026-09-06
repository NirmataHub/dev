import '../Pages/Courses.css'
import { Link } from 'react-router-dom';

export default function CourseSidebar({ courseData, activeLesson, setActiveLesson }) {
  return (
    <aside className="course-sidebar">
      {/* Brand Header */}
      <Link to="/" className="sidebar-brand" title="Back to Home">
        <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span>NH-LIB</span>
      </Link>

      {/* Course Info */}
      <div className="sidebar-course-header">
        <Link to="/courses" className="back-link">← All Courses</Link>
        <h2>{courseData.title}</h2>
      </div>

      {/* Syllabus */}
      <nav className="sidebar-nav">
        <span className="sidebar-label">SYLLABUS</span>
        <ul className="lessons-list">
          {courseData.lessons?.map((lesson, lessonIdx) => (
            <li key={lesson.id || lessonIdx} className="lesson-group">
              <div className="lesson-group-title">
                {lessonIdx + 1}. {lesson.title}
              </div>

              {lesson.subLessons && lesson.subLessons.length > 0 && (
                <ul className="sublessons-list">
                  {lesson.subLessons.map((sub, subIdx) => {
                    const itemKey = `${lessonIdx}-${subIdx}`;
                    const isActive = activeLesson === itemKey;

                    return (
                      <li key={sub.id || subIdx}>
                        <button
                          type="button"
                          className={`sublesson-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveLesson(itemKey)}
                        >
                          {sub.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}