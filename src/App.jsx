import { useState } from "react";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Repos from "./components/Repos";
import Skeleton from "./components/Skeleton";
import CompareToggle from "./components/CompareToggle";
import Comparison from "./components/Comparison.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Comparison state
  const [compareMode, setCompareMode] = useState(false);
  const [user1, setUser1] = useState(null);
  const [repos1, setRepos1] = useState([]);
  const [user2, setUser2] = useState(null);
  const [repos2, setRepos2] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const fetchUser = async (username) => {
    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");

      const userData = await userRes.json();

      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
      );
      const repoData = await repoRes.json();

      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser1 = async (username) => {
    setLoading1(true);
    setError1("");
    setUser1(null);
    setRepos1([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");

      const userData = await userRes.json();

      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );
      const repoData = await repoRes.json();

      setUser1(userData);
      setRepos1(repoData);
    } catch (err) {
      setError1(err.message);
    } finally {
      setLoading1(false);
    }
  };

  const fetchUser2 = async (username) => {
    setLoading2(true);
    setError2("");
    setUser2(null);
    setRepos2([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");

      const userData = await userRes.json();

      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );
      const repoData = await repoRes.json();

      setUser2(userData);
      setRepos2(repoData);
    } catch (err) {
      setError2(err.message);
    } finally {
      setLoading2(false);
    }
  };

  const handleToggleCompare = () => {
    setCompareMode(!compareMode);
    // Clear both modes when switching
    setUser(null);
    setRepos([]);
    setUser1(null);
    setRepos1([]);
    setUser2(null);
    setRepos2([]);
    setError("");
    setError1("");
    setError2("");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <svg
            className="github-logo"
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h1 className="app-title">GitHub Profile Viewer</h1>
        </div>
        <p className="app-subtitle">
          Discover and explore GitHub profiles and repositories
        </p>
      </header>

      <CompareToggle 
        compareMode={compareMode} 
        onToggle={handleToggleCompare} 
      />

      {!compareMode ? (
        <>
          <Search onSearch={fetchUser} />

          {error && (
            <div className="error-message">
              <svg
                className="error-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {loading && <Skeleton />}
          {user && !loading && <Profile user={user} />}
          {repos.length > 0 && !loading && <Repos repos={repos} />}

          {!user && !loading && !error && (
            <div className="empty-state">
              <svg
                className="empty-icon"
                viewBox="0 0 24 24"
                width="64"
                height="64"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <p className="empty-text">Search for a GitHub username to get started</p>
            </div>
          )}
        </>
      ) : (
        <Comparison
          user1={user1}
          repos1={repos1}
          loading1={loading1}
          error1={error1}
          onSearch1={fetchUser1}
          user2={user2}
          repos2={repos2}
          loading2={loading2}
          error2={error2}
          onSearch2={fetchUser2}
        />
      )}
    </div>
  );
}

export default App;