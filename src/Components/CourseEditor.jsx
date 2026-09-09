import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import './CourseEditor.css';

const starterFiles = {
  html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <main class="card">
      <h1>Hello, HTML!</h1>
      <p>This starter code.</p>
    </main>
  </body> 
</html>`,
  css: `* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #06142b;
  color: #e2e8f0;
  font-family: system-ui, sans-serif;
}
.card {
  padding: 2rem;
  border: 1px solid #00f0ff;
  border-radius: 1rem;
  text-align: center;
}
h1 { color: #00f0ff; }`,
};

// Safe extraction from JSON string, subLesson object, or initialCode object
const getInitialFiles = (initialCode) => {
  let parsed = initialCode;

  if (typeof initialCode === 'string') {
    try {
      parsed = JSON.parse(initialCode);
    } catch {
      parsed = {};
    }
  }

  // If passed the entire subLesson object
  if (parsed && typeof parsed === 'object' && 'initialCode' in parsed) {
    parsed = parsed.initialCode;
  }

  return {
    html: typeof parsed?.html === 'string' && parsed.html.trim() !== '' ? parsed.html : starterFiles.html,
    css: typeof parsed?.css === 'string' && parsed.css.trim() !== '' ? parsed.css : starterFiles.css,
  };
};

const voidElements = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const getPosition = (source, index) => {
  const priorText = source.slice(0, index);
  const lines = priorText.split('\n');
  return { line: lines.length, column: lines.at(-1).length + 1 };
};

const validateHtml = (source) => {
  const errors = [];
  const openTags = [];
  const tagPattern = /<\/?([a-z][\w-]*)(?:\s[^<>]*?)?\s*\/?>/gi;
  let match;

  while ((match = tagPattern.exec(source))) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const position = getPosition(source, match.index);
    const isClosingTag = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || voidElements.has(tagName);

    if (isClosingTag) {
      const openTag = openTags.at(-1);
      if (!openTag || openTag.name !== tagName) {
        errors.push({ ...position, message: `Unexpected closing </${tagName}> tag.` });
      } else {
        openTags.pop();
      }
    } else if (!isSelfClosing) {
      openTags.push({ name: tagName, ...position });
    }
  }
  openTags.forEach((tag) => errors.push({ ...tag, message: `Unclosed <${tag.name}> tag.` }));
  return errors;
};

const buildPreview = ({ html, css }) => {
  const stylesheet = `<style>${css}</style>`;
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${stylesheet}</head>`);
  if (/<\/body>/i.test(html)) return `<!doctype html><html><head><meta charset="UTF-8">${stylesheet}</head>${html}</html>`;
  return `<!doctype html><html><head><meta charset="UTF-8">${stylesheet}</head><body>${html}</body></html>`;
};

export default function CourseEditor({ initialCode }) {
  const [files, setFiles] = useState(() => getInitialFiles(initialCode));
  const [activeFile, setActiveFile] = useState('html');
  const [preview, setPreview] = useState(() => buildPreview(getInitialFiles(initialCode)));
  const [syntaxErrors, setSyntaxErrors] = useState(() => validateHtml(getInitialFiles(initialCode).html));

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Sync state & Monaco model value when initialCode prop changes
  useEffect(() => {
    const newFiles = getInitialFiles(initialCode);
    setFiles(newFiles);
    setPreview(buildPreview(newFiles));

    const errors = validateHtml(newFiles.html);
    setSyntaxErrors(errors);

  }, [JSON.stringify(initialCode)]);

  const applyHtmlMarkers = (html, model = editorRef.current?.getModel()) => {
    const errors = validateHtml(html);
    setSyntaxErrors(errors);

    if (model && monacoRef.current) {
      monacoRef.current.editor.setModelMarkers(
        model,
        'course-html-validator',
        errors.map((error) => ({
          startLineNumber: error.line,
          startColumn: error.column,
          endLineNumber: error.line,
          endColumn: error.column + 1,
          message: error.message,
          severity: monacoRef.current.MarkerSeverity.Error,
        }))
      );
    }
    return errors;
  };

  const configureTheme = (monaco) => {
    monaco.editor.defineTheme('nirmata-blue', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#07142d',
        'editor.foreground': '#d8e6ff',
        'editorLineNumber.foreground': '#52658a',
        'editorLineNumber.activeForeground': '#00f0ff',
        'editorCursor.foreground': '#00f0ff',
        'editor.selectionBackground': '#15537a99',
        'editorGutter.background': '#07142d',
      },
    });
  };

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    applyHtmlMarkers(files.html, editor.getModel());
  };

  const updateFile = (value) => {
    const nextValue = value ?? '';
    setFiles((current) => ({ ...current, [activeFile]: nextValue }));
    if (activeFile === 'html') applyHtmlMarkers(nextValue);
  };

  const handleTabChange = (file) => {
    setActiveFile(file);
  };

  const runCode = () => {
    const errors = applyHtmlMarkers(files.html);
    if (errors.length === 0) setPreview(buildPreview(files));
  };

  return (
    <section className="course-editor" aria-label="Code editor and preview">
      <div className="editor-pane">
        <header className="editor-toolbar">
          <div className="editor-file-tabs" role="tablist" aria-label="Code files">
            {['html', 'css'].map((file) => (
              <button
                key={file}
                type="button"
                role="tab"
                aria-selected={activeFile === file}
                className={`editor-file-tab ${activeFile === file ? 'active' : ''}`}
                onClick={() => handleTabChange(file)}
              >
                {file === 'html' ? 'index.html' : 'style.css'}
              </button>
            ))}
          </div>
          <button type="button" className="run-code-btn" onClick={runCode}>
            <span aria-hidden="true">▶</span> Run
          </button>
        </header>
        <div className="monaco-editor-frame">
          <Editor
            height="100%"
            path={activeFile === 'html' ? 'index.html' : 'style.css'}
            language={activeFile}
            theme="nirmata-blue"
            value={files[activeFile]}
            beforeMount={configureTheme}
            onMount={handleEditorMount}
            onChange={updateFile}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              padding: { top: 14 },
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
      </div>
      <div className={`preview-pane ${syntaxErrors.length ? 'has-syntax-error' : ''}`}>
        <header className="preview-toolbar">
          Preview
          {syntaxErrors.length > 0 && (
            <span className="syntax-error-message">
              {syntaxErrors.length} HTML {syntaxErrors.length === 1 ? 'error' : 'errors'}
            </span>
          )}
        </header>
        <iframe className="code-preview" title="Code preview" sandbox="" srcDoc={preview} />
      </div>
    </section>
  );
}
