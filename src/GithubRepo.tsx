import { useState } from "react";
import "./GitHubRepo.css"
import Dropdown from "./components/Dropdown";

type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  language: string;
}

type SearchResponse = {
  total_count: number;
  items: Repository[];
}

const GitHubRepoSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("10");
  const [sortBy, setSortBy] = useState("best-match");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const searchRepositories = async (page: number = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const sortParam = sortBy === "best-match" ? "" : `&sort=${sortBy}`;
      const orderParam = sortBy === "best-match" ? "" : `&order=${order}`;

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query
        )}&page=${page}&per_page=${perPage}${sortParam}${orderParam}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();
      setResults(data.items);
      setTotalCount(data.total_count);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e && "key" in e && e.key !== "Enter") return;
    setCurrentPage(1);
    searchRepositories(1);
  };

  const handlePageChange = (newPage: number) => {
    searchRepositories(newPage);
  };

  const totalPages = Math.ceil(totalCount / Number(perPage));

  return (
    <div className="container">
      <h1>GitHub Repository Search</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories..."
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />
        </div>

        <div className="controls">
          <Dropdown
            label="Items per page"
            value={perPage}
            onChange={setPerPage}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
            ]}
          />

          <Dropdown
            label="Sort by"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "best-match", label: "Sort by Best match" },
              { value: "stars", label: "Stars" },
              { value: "updated", label: "Recently updated" },
            ]}
          />

          {sortBy !== "best-match" && (
            <Dropdown
              label="Order"
              value={order}
              onChange={(value) => setOrder(value as "asc" | "desc")}
              options={[
                { value: "desc", label: "Descending" },
                { value: "asc", label: "Ascending" },
              ]}
            />
          )}
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <div className="repo-list">
          <p>Found {totalCount.toLocaleString()} repositories</p>
          {results.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.full_name}
                </a>
              </h3>
              <p>{repo.description || "No description available"}</p>
              <div className="repo-meta">
                <span>⭐ {repo.stargazers_count.toLocaleString()} stars</span>
                {repo.language && <span> | Language: {repo.language}</span>}
                <span>
                  {" "}
                  | Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              {totalPages <= 10 &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={page === currentPage ? "active" : ""}
                    >
                      {page}
                    </button>
                  )
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubRepoSearch;
