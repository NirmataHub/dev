import "./../App.css"; 

export default function Hero() {
  return (
  <>
    <section className="hero">
      <div className="NH-CTA">
          <video
          src="/ItemCovers/NewBG.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <p className="Brand-Name">NIRMATA <br/> HUB <br/>
        <span className="Learnn-Btn">Learn From Zero</span></p>



      </div>
      <div className="TerminalContainer">
        <div className="Nirmata-Terminal">
          <div className="Terminal-Header">
            <div className="Window-Controls">
              <span className="dot close"></span>
              <span className="dot minimize"></span>
              <span className="dot expand"></span>
            </div>
            <div className="Terminal-Title">NirmataHub-Config</div>
          </div>

          <div className="Terminal-Body">
            <pre>
              <code>
                <span className="keyword">import</span> {'{ '}
                <span className="component">HeroFX</span>
                {' }'} <span className="keyword">from</span>{' '}
                <span className="string">'@nirmata/components'</span>;
                <br /><br />
                <span className="keyword">export default function</span> <span className="function">App</span>() {'{'}
                <br />
                {'  '}<span className="keyword">return</span> (
                <br />
                {'    '}&lt;<span className="component">HeroFX</span>
                <br />
                {'      '}theme=<span className="string">"cyberpunk"</span>
                <br />
                {'      '}particles={'{'}<span className="number">150</span>{'}'}
                <br />
                {'      '}glow=<span className="string">"#00FFCC"</span>
                <br />
                {'    '}/&gt;
                <br />
                {'  '});
                <br />
                {'}'}
              </code>
            </pre>
          </div>

          <div className="Terminal-Footer">
            <div className="Tabs">
              <span className="active">React</span>
              <span>Vite</span>
            </div>
            <div className="Caption">↔ Own Your Components</div>
          </div>
        </div>
        
      </div>


    </section>
    <h2 >Next-Gen FX & React Components</h2> 
  </>
  );
}