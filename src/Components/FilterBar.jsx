export default function FilterBar({
  itemType,
  setItemType,

}) {
  const handleTypeChange = (type) => {
    setItemType(type);

  };

  return (
    <div className="filter-bar">    
        <button 
          type="button"
          className={`toggle-btn ${itemType === 'all' ? 'active' : ''}`}
          onClick={() => handleTypeChange('all')}
        >
          All Items
        </button>
        <button 
          type="button"
          className={`toggle-btn ${itemType === 'component' ? 'active' : ''}`}
          onClick={() => handleTypeChange('component')}
        >
          UI Components
        </button>
        <button 
          type="button"
          className={`toggle-btn ${itemType === 'asset' ? 'active' : ''}`}
          onClick={() => handleTypeChange('asset')}
        >
          Generated Assets
        </button>
      </div>
  );
}