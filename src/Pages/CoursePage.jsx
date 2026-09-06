import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopMenu from '../Components/TopMenu';
import CourseSidebar from '../Components/CourseSidebar';
import './Courses.css';

export default function CoursePage() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [activeLessonKey, setActiveLessonKey] = useState('0-0');
  const [loading, setLoading] = useState(true);

  // Mobile drawer toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Mobile tab state: 'content' | 'editor'
  const [mobileTab, setMobileTab] = useState('content');

  useEffect(() => {
    setLoading(true);
    import(`../Data/${courseId}.json`)
      .then((module) => {
        setCourseData(module.default || module);
        setActiveLessonKey('0-0');
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Could not load JSON for "${courseId}":`, err);
        setCourseData(null);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return (
      <div className="courses-page">
        <TopMenu />
        <div className="coming-soon-container">
          <h2 className="coming-soon-title">Loading Course...</h2>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="courses-page">
        <TopMenu />
        <div className="coming-soon-container">
          <h1 className="coming-soon-title">Coming Soon</h1>
          <p className="coming-soon-subtitle">
            The module for <strong>{courseId}</strong> is under construction.
          </p>
          <Link to="/courses" className="coming-soon-btn">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  const [lessonIdx, subIdx] = activeLessonKey.split('-').map(Number);
  const activeSubLesson = courseData.lessons?.[lessonIdx]?.subLessons?.[subIdx];

  return (
    <div className="course-viewer-layout">
      {/* Mobile Backdrop for Sidebar */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar (Positioned off-canvas on mobile) */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'mobile-open' : ''}`}>
        <CourseSidebar 
          courseData={courseData} 
          activeLesson={activeLessonKey} 
          setActiveLesson={(key) => {
            setActiveLessonKey(key);
            setSidebarOpen(false); // Close sidebar on selection in mobile
          }} 
        />
      </div>

      {/* Main Workspace */}
      <main className="course-content-pane">
        <div className="workspace-container">
          
          {/* Mobile Navigation Header Bar */}
          <div className="mobile-header-bar">
            <button 
              type="button" 
              className="menu-toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰ Syllabus
            </button>
            <div className="mobile-tab-group">
              <button 
                type="button"
                className={`tab-btn ${mobileTab === 'content' ? 'active' : ''}`}
                onClick={() => setMobileTab('content')}
              >
                📖 Content
              </button>
              <button 
                type="button"
                className={`tab-btn ${mobileTab === 'editor' ? 'active' : ''}`}
                onClick={() => setMobileTab('editor')}
              >
                💻 Code
              </button>
            </div>
          </div>

          {/* Top Section: Media + Code Editor */}
          <section className={`top-workspace-section ${mobileTab === 'editor' ? 'show-editor-mobile' : 'show-content-mobile'}`}>
            {/* Area 1: Media Player */}
            <div className="media-container">
              <div className="shorts-placeholder">
                <span>9:16 Shorts Media</span>
              </div>
            </div>

            {/* Area 2: Code Editor Placeholder */}
            <div className="monaco-placeholder">
              <div className="editor-header">
                <span>index.html</span>
                <span className="badge">Monaco Editor</span>
              </div>
              <div className="editor-body">// Monaco Editor Instance</div>
            </div>
          </section>

          {/* Area 3: Scrollable Text Content Area */}
          <section className={`content-scroll-section ${mobileTab === 'editor' ? 'hide-mobile' : ''}`}>
            <h1>{activeSubLesson?.title || 'Select a Lesson'}</h1>
            
            <div className="lesson-text-body">
              {activeSubLesson?.paragraphs?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {activeSubLesson?.attributes && (
                <div className="meta-block">
                  <h3>Attributes</h3>
                  <div className="tags-flex">
                    {activeSubLesson.attributes.map((attr, i) => (
                      <span key={i} className="code-tag">{attr}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}