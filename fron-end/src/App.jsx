// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./resources/Home.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={< Home dashboardName={"Home"}/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
