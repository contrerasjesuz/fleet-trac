//javascript/react imports
import { Routes, Route } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  )
}

export default App
