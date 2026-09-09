import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseEditor from '../Components/CourseEditor';
import CourseSidebar from '../Components/CourseSidebar';
import TopMenu from '../Components/TopMenu';
import './Courses.css';
import './CoursePage.css';

export default function CoursePage() {
  const gridRef = useRef(null);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [activeLessonKey, setActiveLessonKey] = useState('0-0');
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [mediaTab, setMediaTab] = useState('diagram');
  const [diagramIndex, setDiagramIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    import(`../Data/${courseId}.json`)
      .then((module) => {
        setCourseData(module.default || module);
        setActiveLessonKey('0-0');
        setDiagramIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Could not load JSON for "${courseId}":`, error);
        setCourseData(null);
        setLoading(false);
      });
  }, [courseId]);

  const updateCursor = (event) => {
    gridRef.current?.style.setProperty('--mx', `${event.clientX}px`);
    gridRef.current?.style.setProperty('--my', `${event.clientY}px`);
  };

  const clearCursor = () => {
    gridRef.current?.style.setProperty('--mx', '-9999px');
    gridRef.current?.style.setProperty('--my', '-9999px');
  };

  if (loading || !courseData) {
    return (
      <div className="courses-page">
        <TopMenu />
        <div className="coming-soon-container">
          <h2 className="coming-soon-title">{loading ? 'Loading Course...' : 'Coming Soon'}</h2>
          {!loading && <Link to="/courses" className="coming-soon-btn">Back to Courses</Link>}
        </div>
      </div>
    );
  }

  const [lessonIdx, subIdx] = activeLessonKey.split('-').map(Number);
  const activeSubLesson = courseData.lessons?.[lessonIdx]?.subLessons?.[subIdx];
  const diagrams = Array.isArray(activeSubLesson?.diagrams)
    ? activeSubLesson.diagrams.filter(Boolean)
    : activeSubLesson?.diagrams ? [activeSubLesson.diagrams] : [];
  const activeDiagram = diagrams[diagramIndex] || diagrams[0];
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const isCompactSidebar = isMobile ? !isMobileSidebarOpen : isSidebarCollapsed;

  const selectLesson = (key) => {
    setActiveLessonKey(key);
    setDiagramIndex(0);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div ref={gridRef} className="course-viewer-layout" onMouseMove={updateCursor} onMouseLeave={clearCursor}>
      <div className={`sidebar-wrapper ${isCompactSidebar ? 'is-collapsed' : ''} ${isMobileSidebarOpen ? 'mobile-expanded' : ''}`}>
        <CourseSidebar
          courseData={courseData}
          activeLesson={activeLessonKey}
          setActiveLesson={selectLesson}
          isCollapsed={isCompactSidebar}
          onToggleCollapse={() => {
            if (isMobile) {
              setIsMobileSidebarOpen((isOpen) => !isOpen);
              return;
            }
            setIsSidebarCollapsed((collapsed) => !collapsed);
          }}
        />
      </div>
      <main className="course-content-pane">
        <div className="workspace-container">
          <section className="top-workspace-section" aria-label="Lesson media">
            <div className="media-tabs" role="tablist" aria-label="Lesson media options">
              {['diagram', 'video', 'editor'].map((tab) => (
                <button key={tab} type="button" role="tab" aria-selected={mediaTab === tab} className={`media-tab ${mediaTab === tab ? 'active' : ''}`} onClick={() => setMediaTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="media-panel" role="tabpanel">
              {mediaTab === 'diagram' && (diagrams.length ? (
                <div className="diagram-viewer">
                  <img className="diagram-image" src={activeDiagram} alt={`${activeSubLesson?.title || 'Lesson'} diagram`} />
                  {diagrams.length > 1 && <>
                    <button type="button" className="carousel-btn prev-btn" onClick={() => setDiagramIndex((index) => (index - 1 + diagrams.length) % diagrams.length)} aria-label="Previous diagram">‹</button>
                    <button type="button" className="carousel-btn next-btn" onClick={() => setDiagramIndex((index) => (index + 1) % diagrams.length)} aria-label="Next diagram">›</button>
                    <span className="carousel-indicator">{diagramIndex + 1} / {diagrams.length}</span>
                  </>}
                </div>
              ) : <p className="media-empty-state">No diagram is available for this lesson.</p>)}
              {mediaTab === 'video' && (activeSubLesson?.video
                ? <iframe className="lesson-video" src={activeSubLesson.video} title={`${activeSubLesson.title} video`} allowFullScreen />
                : <p className="media-empty-state">No video is available for this lesson.</p>)}
              {mediaTab === 'editor' && (
                <CourseEditor
                  key={activeLessonKey}
                  initialCode={
                    activeSubLesson?.initialCode
                    ?? activeSubLesson?.codeFiles
                    ?? activeSubLesson?.code
                    ?? activeSubLesson?.codeSnippet
                  }
                />
              )}
            </div>
          </section>
          <section className="content-scroll-section">
            <h1>{activeSubLesson?.title || 'Select a Lesson'}</h1>
            <div className="lesson-text-body">
              {activeSubLesson?.paragraphs?.map((paragraph, index) => (
                <div
                  key={index}
                  className="lesson-rich-block"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              {activeSubLesson?.attributes && <div className="meta-block"><h3>Attributes</h3><div className="tags-flex">{activeSubLesson.attributes.map((attribute, index) => <span key={index} className="code-tag">{attribute}</span>)}</div></div>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
