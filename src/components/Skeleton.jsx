import "./Skeleton.css";

function Skeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-card">
        {/* Profile Section */}
        <div className="skeleton-profile">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-info">
            <div className="skeleton-line skeleton-name"></div>
            <div className="skeleton-line skeleton-username"></div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="skeleton-bio">
          <div className="skeleton-line skeleton-bio-line"></div>
          <div className="skeleton-line skeleton-bio-line"></div>
          <div className="skeleton-line skeleton-bio-line short"></div>
        </div>

        {/* Stats Section */}
        <div className="skeleton-stats">
          <div className="skeleton-stat">
            <div className="skeleton-line skeleton-stat-number"></div>
            <div className="skeleton-line skeleton-stat-label"></div>
          </div>
          <div className="skeleton-stat">
            <div className="skeleton-line skeleton-stat-number"></div>
            <div className="skeleton-line skeleton-stat-label"></div>
          </div>
          <div className="skeleton-stat">
            <div className="skeleton-line skeleton-stat-number"></div>
            <div className="skeleton-line skeleton-stat-label"></div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="skeleton-details">
          <div className="skeleton-detail-item">
            <div className="skeleton-icon"></div>
            <div className="skeleton-line skeleton-detail-text"></div>
          </div>
          <div className="skeleton-detail-item">
            <div className="skeleton-icon"></div>
            <div className="skeleton-line skeleton-detail-text"></div>
          </div>
        </div>
      </div>

      {/* Repository Skeletons */}
      <div className="skeleton-repos">
        <div className="skeleton-repos-header">
          <div className="skeleton-line skeleton-repos-title"></div>
        </div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="skeleton-repo-card">
            <div className="skeleton-repo-header">
              <div className="skeleton-line skeleton-repo-name"></div>
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-line skeleton-repo-desc"></div>
            <div className="skeleton-line skeleton-repo-desc short"></div>
            <div className="skeleton-repo-footer">
              <div className="skeleton-circle"></div>
              <div className="skeleton-circle"></div>
              <div className="skeleton-circle"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;