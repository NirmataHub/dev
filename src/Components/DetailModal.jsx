import { useState } from 'react';

const getYoutubeEmbedUrl = (videoUrl) => {
  const match = videoUrl?.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([^?&#/]+)/i);
  return match
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&disablekb=1&iv_load_policy=3&modestbranding=1&rel=0`
    : '';
};

const GitIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.15-1.11-1.46-1.11-1.46-.91-.61.07-.6.07-.6 1 .07 1.54 1.03 1.54 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.9.68 1.82v2.69c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="social-icon-fill" /></svg>;
const YoutubeIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.58 7.19a2.73 2.73 0 0 0-1.92-1.93C17.96 4.8 12 4.8 12 4.8s-5.96 0-7.66.46A2.73 2.73 0 0 0 2.42 7.2 28.3 28.3 0 0 0 2 12a28.3 28.3 0 0 0 .42 4.81 2.73 2.73 0 0 0 1.92 1.93c1.7.46 7.66.46 7.66.46s5.96 0 7.66-.46a2.73 2.73 0 0 0 1.92-1.93A28.3 28.3 0 0 0 22 12a28.3 28.3 0 0 0-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>;

export default function DetailModal({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!item) return null;

  const videoEmbedUrl = getYoutubeEmbedUrl(item.videoUrl);
  const socialLinks = item.socialLinks || {};

  const copyCommand = async () => {
    if (!item.npmCommand) return;
    await navigator.clipboard?.writeText(item.npmCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div onClick={(event) => event.target === event.currentTarget && onClose()} className="modal-backdrop">
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">×</button>
        <div className="modal-video-pane">
          {videoEmbedUrl ? <iframe src={videoEmbedUrl} title={`${item.title || 'Item'} short preview`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <img src={item.coverImage || ''} alt={item.title || 'Item preview'} />}
        </div>
        <div className="modal-info-pane">
          <div className="modal-info-primary">
            <h2 id="modal-title" className="modal-title">{item.title || 'Untitled'}</h2>
            <p className="modal-description">{item.shortDescription || ''}</p>
          </div>
          <div className="modal-info-secondary">
            <div className="modal-socials" aria-label="See it live">
              <span>See it live</span>
              {socialLinks.git && <a href={socialLinks.git} target="_blank" rel="noreferrer" aria-label="Open GitHub"><GitIcon /></a>}
              {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram"><InstagramIcon /></a>}
              {socialLinks.youtube && <a href={socialLinks.youtube} target="_blank" rel="noreferrer" aria-label="Open YouTube"><YoutubeIcon /></a>}
            </div>
            {item.npmCommand && <div className="modal-code-box"><code>{item.npmCommand}</code><button type="button" onClick={copyCommand}>{copied ? 'Copied' : 'Copy'}</button></div>}
            <div className="modal-features-list">
              {(item.features || []).filter(Boolean).map((feature) => <span key={feature} className="modal-feat-tag">{feature}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
