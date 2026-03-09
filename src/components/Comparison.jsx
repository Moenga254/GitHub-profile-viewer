import { useState } from "react";
import "./Comparison.css";
import Skeleton from "./Skeleton";

// ✅ FIX 3: Moved outside component so it's in scope everywhere
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Ruby: "#701516",
    PHP: "#4F5D95",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Vue: "#41b883",
    React: "#61dafb",
    Shell: "#89e051",
    Dart: "#00B4AB",
    Scala: "#c22d40",
  };
  return colors[language] || "#8b949e";
};

function Comparison({
  user1,
  repos1,
  loading1,
  error1,
  onSearch1,
  user2,
  repos2,
  loading2,
  error2,
  onSearch2,
}) {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");

  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (!username1.trim()) return;
    onSearch1(username1);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (!username2.trim()) return;
    onSearch2(username2);
  };

  const getLanguageStats = (repos) => {
    const languages = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const getTotalStats = (repos) => {
    return repos.reduce(
      (acc, repo) => ({
        stars: acc.stars + repo.stargazers_count,
        forks: acc.forks + repo.forks_count,
      }),
      { stars: 0, forks: 0 }
    );
  };

  const renderSearchForm = (
    username,
    setUsername,
    handleSubmit,
    placeholder,
    suggestions
  ) => (
    <form onSubmit={handleSubmit} className="compare-search-form">
      <div className="compare-search-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="compare-search-input"
          placeholder={placeholder}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {username && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setUsername("")}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <button type="submit" className="compare-search-button" disabled={!username.trim()}>
        Search
      </button>
      <div className="compare-suggestions">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="suggestion-chip-small"
            onClick={() => setUsername(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );

  const renderUserCard = (user, repos, loading, error) => {
    if (loading) {
      return (
        <div className="compare-user-card loading">
          <Skeleton />
        </div>
      );
    }

    if (error) {
      return (
        <div className="compare-user-card error">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <p>{error}</p>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="compare-user-card empty">
          <svg
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <p>Search for a user</p>
        </div>
      );
    }

    const totalStats = getTotalStats(repos);
    // ✅ FIX 2: Computed here at top of the successful render path, used inline below
    const languageStats = getLanguageStats(repos);

    // ✅ FIX 4: Single, clean return with everything inside it
    return (
      <div className="compare-user-card">
        <div className="compare-avatar-section">
          <img src={user.avatar_url} alt={user.login} className="compare-avatar" />
          <h3 className="compare-username">{user.name || user.login}</h3>
          <p className="compare-handle">@{user.login}</p>
        </div>

        <div className="compare-stats-grid">
          <div className="compare-stat">
            <div className="stat-value">{user.public_repos}</div>
            <div className="stat-label">Repos</div>
          </div>
          <div className="compare-stat">
            <div className="stat-value">{user.followers.toLocaleString()}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="compare-stat">
            <div className="stat-value">{user.following.toLocaleString()}</div>
            <div className="stat-label">Following</div>
          </div>
        </div>

        {/* ✅ FIX 1: div now wraps both children instead of being self-closed */}
        <div className="compare-additional-stats">
          <div className="additional-stat">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            <span>{totalStats.stars.toLocaleString()} total stars</span>
          </div>
          <div className="additional-stat">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            </svg>
            <span>{totalStats.forks.toLocaleString()} total forks</span>
          </div>
        </div>

        {languageStats.length > 0 && (
          <div className="compare-languages">
            <h4>Top Languages</h4>
            <div className="language-list">
              {languageStats.map(([lang, count]) => (
                <div key={lang} className="language-item">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  />
                  <span className="language-name">{lang}</span>
                  <span className="language-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <a
          className="view-profile-btn"
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
      </div>
    );
  };

  const renderComparison = () => {
    if (!user1 || !user2) return null;

    const metrics = [
      {
        label: "Repositories",
        value1: user1.public_repos,
        value2: user2.public_repos,
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 2.5A2.5 2.5 0 015.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
          </svg>
        ),
      },
      {
        label: "Followers",
        value1: user1.followers,
        value2: user2.followers,
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M16 7c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
          </svg>
        ),
      },
      {
        label: "Following",
        value1: user1.following,
        value2: user2.following,
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        ),
      },
      {
        label: "Total Stars",
        value1: getTotalStats(repos1).stars,
        value2: getTotalStats(repos2).stars,
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
          </svg>
        ),
      },
      {
        label: "Total Forks",
        value1: getTotalStats(repos1).forks,
        value2: getTotalStats(repos2).forks,
        icon: (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
        ),
      },
    ];

    return (
      <div className="comparison-metrics">
        <h3 className="comparison-title">Head-to-Head Comparison</h3>
        {metrics.map((metric, index) => {
          const winner =
            metric.value1 > metric.value2
              ? "left"
              : metric.value1 < metric.value2
              ? "right"
              : "tie";
          const percentage1 =
            metric.value1 + metric.value2 > 0
              ? (metric.value1 / (metric.value1 + metric.value2)) * 100
              : 50;
          const percentage2 = 100 - percentage1;

          return (
            <div key={index} className="comparison-metric">
              <div className="metric-header">
                {metric.icon}
                <span className="metric-label">{metric.label}</span>
              </div>
              <div className="metric-bars">
                <div className={`metric-bar left ${winner === "left" ? "winner" : ""}`}>
                  <div className="bar-fill" style={{ width: `${percentage1}%` }}></div>
                  <span className="bar-value">{metric.value1.toLocaleString()}</span>
                </div>
                <div className={`metric-bar right ${winner === "right" ? "winner" : ""}`}>
                  <div className="bar-fill" style={{ width: `${percentage2}%` }}></div>
                  <span className="bar-value">{metric.value2.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="comparison-container">
      <div className="comparison-search-section">
        <div className="comparison-search-column">
          <h3 className="search-column-title">User 1</h3>
          {renderSearchForm(username1, setUsername1, handleSubmit1, "Enter first username...", [
            "torvalds",
            "gaearon",
          ])}
        </div>

        <div className="vs-divider">
          <span className="vs-text">VS</span>
        </div>

        <div className="comparison-search-column">
          <h3 className="search-column-title">User 2</h3>
          {renderSearchForm(username2, setUsername2, handleSubmit2, "Enter second username...", [
            "tj",
            "sindresorhus",
          ])}
        </div>
      </div>

      {(error1 || error2) && (
        <div className="comparison-errors">
          {error1 && (
            <div className="error-message">
              <svg className="error-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>User 1: {error1}</span>
            </div>
          )}
          {error2 && (
            <div className="error-message">
              <svg className="error-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>User 2: {error2}</span>
            </div>
          )}
        </div>
      )}

      <div className="comparison-users-section">
        {renderUserCard(user1, repos1, loading1, error1)}
        {renderUserCard(user2, repos2, loading2, error2)}
      </div>

      {renderComparison()}
    </div>
  );
}

export default Comparison;