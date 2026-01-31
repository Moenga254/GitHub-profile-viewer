import "./Repos.css";

function Repos({ repos }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="repos-container">
      <div className="repos-header">
        <h3 className="repos-title">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 2.5A2.5 2.5 0 015.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
          </svg>
          Top Repositories
        </h3>
        <span className="repos-count">{repos.length} total</span>
      </div>

      <div className="repos-grid">
        {repos.slice(0, 6).map((repo) => (
          <div key={repo.id} className="repo-card">
            <div className="repo-header">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="repo-name"
              >
                <svg className="repo-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M3 2.5A2.5 2.5 0 015.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                </svg>
                {repo.name}
              </a>
              
              {repo.private ? (
                <span className="repo-badge private">Private</span>
              ) : (
                <span className="repo-badge public">Public</span>
              )}
            </div>

            {repo.description && (
              <p className="repo-description">{repo.description}</p>
            )}

            <div className="repo-meta">
              {repo.language && (
                <div className="meta-item language">
                  <span 
                    className="language-dot" 
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}

              {repo.stargazers_count > 0 && (
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                  </svg>
                  <span>{formatNumber(repo.stargazers_count)}</span>
                </div>
              )}

              {repo.forks_count > 0 && (
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                  </svg>
                  <span>{formatNumber(repo.forks_count)}</span>
                </div>
              )}

              {repo.open_issues_count > 0 && (
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm0 13a1 1 0 110 2 1 1 0 010-2zm0-9.5a1 1 0 01.993.883L13 8v4.5a1 1 0 01-1.993.117L11 12.5V8a1 1 0 011-1z"/>
                  </svg>
                  <span>{formatNumber(repo.open_issues_count)}</span>
                </div>
              )}
            </div>

            {repo.updated_at && (
              <div className="repo-footer">
                <span className="updated-text">Updated {formatDate(repo.updated_at)}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {repos.length > 6 && (
        <div className="view-all">
          <p className="view-all-text">
            Showing 6 of {repos.length} repositories
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function for language colors
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Vue: '#41b883',
    React: '#61dafb',
    Shell: '#89e051',
    Dart: '#00B4AB',
    Scala: '#c22d40',
  };
  return colors[language] || '#8b949e';
};

export default Repos;