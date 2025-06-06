import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import HomePage from "./HomePage"
import ContactBook from "./ContactBook"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/contact-book" element={<ContactBook />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
