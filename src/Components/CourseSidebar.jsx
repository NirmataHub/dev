import './CourseSideBar.css'
import { Link } from 'react-router-dom';

export default function CourseSidebar({ courseData, activeLesson, setActiveLesson, isCollapsed, onToggleCollapse }) {
  const timelineItems = courseData.lessons?.flatMap((lesson, lessonIdx) =>
    (lesson.subLessons || []).map((sub, subIdx) => ({
      key: `${lessonIdx}-${subIdx}`,
      title: sub.title,
    }))
  ) || [];
  const activeLessonIndex = Math.max(0, timelineItems.findIndex((item) => item.key === activeLesson));
  const getStepLabel = (lessonIndex, subLessonIndex) =>
    `${lessonIndex + 1}${String.fromCharCode(97 + subLessonIndex)}`;

  return (
    <aside className={`course-sidebar ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-topbar">
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand course sidebar' : 'Collapse course sidebar'}
          aria-expanded={!isCollapsed}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={isCollapsed ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
          </svg>
        </button>
        <Link to="/" className="sidebar-brand" title="Back to Home">
        <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span>NH-LIB</span>
        </Link>
      </div>

      {/* Course Info */}
      <div className="sidebar-course-header">
        <h2>{courseData.title}</h2>
      </div>

      {/* Syllabus */}
      <nav className="sidebar-nav">
        <span className="sidebar-label">SYLLABUS</span>
        <ol className="lessons-list">
          {courseData.lessons?.map((lesson, lessonIdx) => (
            <li key={lesson.id || lessonIdx} className="lesson-group">
              <div className="lesson-group-title">
                {lessonIdx + 1}. {lesson.title}
              </div>

              {lesson.subLessons && lesson.subLessons.length > 0 && (
                <ol className="sublessons-list">
                  {lesson.subLessons.map((sub, subIdx) => {
                    const itemKey = `${lessonIdx}-${subIdx}`;
                    const isActive = activeLesson === itemKey;
                    const currentTimelineIndex = timelineItems.findIndex((item) => item.key === itemKey);
                    const isComplete = currentTimelineIndex <= activeLessonIndex;

                    return (
                      <li
                        key={sub.id || subIdx}
                        className={`timeline-item ${isComplete ? 'is-complete' : ''} ${isActive ? 'is-active' : ''}`}
                      >
                        <button
                          type="button"
                          className={`sublesson-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveLesson(itemKey)}
                          aria-current={isActive ? 'step' : undefined}
                          title={isCollapsed ? `${currentTimelineIndex + 1}. ${sub.title}` : undefined}
                        >
                          <span className="timeline-dot" aria-hidden="true">
                            {isActive && <span className="timeline-step-label">{getStepLabel(lessonIdx, subIdx)}</span>}
                          </span>
                          <span className="sublesson-title">{sub.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Link to="/courses" className="sidebar-all-courses">
        <span aria-hidden="true">←</span> All Courses
      </Link>
    </aside>
  );
}
