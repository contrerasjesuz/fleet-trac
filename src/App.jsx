//javascript/react imports
import { Routes, Route } from 'react-router-dom';
import { supabase } from "./lib/supabase";
import { useEffect } from 'react';
// Components
import Navbar from './components/Navbar';
// Pages
import Home from './pages/Home.jsx';
import SignIn from './auth/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        // Just try to get the current session
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        console.log("Supabase connected ✅", data);
      } catch (err) {
        console.error("Supabase connection failed ❌", err.message);
      }
    }

    testConnection();
  }, []);
  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  )
}

export default App
