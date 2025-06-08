import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import ContactBook from "./ContactBook"
import GitHubRepoSearch from "./GithubRepo"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/contact-book" element={<ContactBook />}/>
      <Route path="/github-repo" element={<GitHubRepoSearch />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
