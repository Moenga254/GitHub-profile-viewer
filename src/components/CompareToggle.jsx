import "./Comparison.css";

function CompareToggle({ compareMode, onToggle }) {
  return (
    <div className="compare-toggle-container">
      <button 
        className={`compare-toggle-btn ${compareMode ? 'active' : ''}`}
        onClick={onToggle}
      >
        <svg 
          className="toggle-icon" 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4"/>
        </svg>
        <span>{compareMode ? 'Exit Comparison Mode' : 'Compare Users'}</span>
        {compareMode && (
          <svg 
            className="close-icon" 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        )}
      </button>
    </div>
  );
}

export default CompareToggle;
