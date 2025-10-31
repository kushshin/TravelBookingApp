import Home from './Pages/Home'
import Details from './Pages/Details'
import CheckOut from './Pages/CheckOut'
import Result from './Pages/Result'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'

function App() {
 

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App
