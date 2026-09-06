export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  const isAsset = item.itemType === 'asset';
  const assetData = item.assetData || {};
  const downloadUrl = assetData.downloadUrl || item.downloadUrl || '#';

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackdropClick} className="modal-backdrop">
      <div className="modal-container">
        
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          ✕
        </button>

        {/* Media Container */}
        <div className="modal-video-pane">
          {isAsset ? (
            <img 
              src={item.coverImage || ''} 
              alt={item.title || 'Asset Preview'} 
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#060913' }}
            />
          ) : item.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&modestbranding=1&rel=0`}
              title={item.title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img 
              src={item.coverImage || ''} 
              alt={item.title || 'Component Preview'} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Info Pane */}
        <div className="modal-info-pane">
          <div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {item.tier && (
                <span className={`modal-cat-tag tier-badge ${item.tier}`}>
                  {item.tier}
                </span>
              )}
              {Array.isArray(item.categories) && item.categories.map((cat) => (
                <span key={cat} className="modal-cat-tag">
                  {cat}
                </span>
              ))}
            </div>
            
            <h2 className="modal-title">{item.title || 'Untitled'}</h2>
            <p className="modal-description">{item.shortDescription || ''}</p>
            
            {/* Component npm command */}
            {!isAsset && item.npmCommand && (
              <div className="modal-code-box">
                {item.npmCommand}
              </div>
            )}

            {/* Asset download button */}
            {isAsset && (
              <div style={{ marginTop: '16px' }}>
                <a 
                  href={downloadUrl} 
                  className="download-asset-btn" 
                  download
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#00f0ff',
                    color: '#060913',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  Download Asset Pack
                </a>
              </div>
            )}
          </div>
          <div className="modal-features-list">
            {isAsset ? (
              <>
                {Array.isArray(assetData.fileFormats) && assetData.fileFormats.map((fmt) => (
                  <span key={fmt} className="modal-feat-tag">{fmt}</span>
                ))}
                {assetData.resolution && (
                  <span className="modal-feat-tag">{assetData.resolution}</span>
                )}
                {assetData.renderType && (
                  <span className="modal-feat-tag">{assetData.renderType}</span>
                )}
              </>
            ) : (
              Array.isArray(item.features) && item.features.map((feat) => (
                <span key={feat} className="modal-feat-tag">
                  {feat}
                </span>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}