import { useState, useMemo, useRef } from 'react';
import items from './../Data/LibraryItems.json';
import FilterBar from './FilterBar';
import DetailModal from './DetailModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function LibraryGrid() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('all');
  const gridRef = useRef(null);

  // Mouse move handler attached directly to the grid
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    
    // Pass global cursor screen coords directly
    gridRef.current.style.setProperty('--mx', `${e.clientX}`);
    gridRef.current.style.setProperty('--my', `${e.clientY}`);
  };

  const handleMouseLeave = () => {
    if (!gridRef.current) return;
    gridRef.current.style.setProperty('--mx', '-9999');
    gridRef.current.style.setProperty('--my', '-9999');
  };

  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => {
      if (!item) return false;
      if (itemType !== 'all') {
        const typeOfItem = item.itemType || 'component';
        if (typeOfItem !== itemType) return false;
      }
      return true;
    });
  }, [itemType]);

  return (
    <div className="grid-container">
      <FilterBar itemType={itemType} setItemType={setItemType} />
      <motion.div 
          layout
          ref={gridRef}
          className="library-grid"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div 
                key="no-items"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#ff4444' }}
              >
                <h3>No items found</h3>
              </motion.div>
            ) : (
              filteredItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    opacity: { duration: 0.2 },
                    layout: { type: "spring", stiffness: 500, damping: 35 }
                  }}
                  className="card-item glow-border"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="image-wrapper">
                    <img
                      src={item.coverImage || ''}
                      alt={item.title || 'Item'}
                      className="card-image"
                    />
                  </div>

                  <div className="content-box">
                    <h3 className="item-title">{item.title || 'Untitled'}</h3>
                    <p className="item-categories">
                      {Array.isArray(item.categories) ? item.categories.join(' · ') : ''}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

      {selectedItem && (
        <DetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}