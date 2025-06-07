import React, { useState } from "react";

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
  const [perPage, setPerPage] = useState(10);
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

  const handleSearch = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && "key" in e && e.key !== "Enter") return;
    setCurrentPage(1);
    searchRepositories(1);
  };

  const handlePageChange = (newPage: number) => {
    searchRepositories(newPage);
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form onSubmit={()=>handleSearch}>
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories..."
            style={{ width: "300px", padding: "8px" }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <span>
            Items per page:
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </span>

          <span style={{ marginLeft: "20px" }}>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="best-match">Best match</option>
              <option value="stars">Stars</option>
              <option value="updated">Most recently updated</option>
            </select>
          </span>

          {sortBy !== "best-match" && (
            <span style={{ marginLeft: "20px" }}>
              Order:
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </span>
          )}
        </div>
      </form>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p>Found {totalCount.toLocaleString()} repositories</p>

          <div>
            {results.map((repo) => (
              <div
                key={repo.id}
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
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
                <div>
                  <span>⭐ {repo.stargazers_count.toLocaleString()} stars</span>
                  {repo.language && (
                    <span style={{ marginLeft: "20px" }}>
                      Language: {repo.language}
                    </span>
                  )}
                  <span style={{ marginLeft: "20px" }}>
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

              {totalPages <= 10 && (
                <div style={{ marginTop: "10px" }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                          margin: "0 2px",
                          backgroundColor:
                            page === currentPage ? "#007cba" : "white",
                          color: page === currentPage ? "white" : "black",
                        }}
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
      )}
    </div>
  );
};

export default GitHubRepoSearch;
