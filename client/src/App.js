// Import React modules
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// COMPONENTS:
import Layout from './components/layout/Layout';
import PrivateRoutes from './components/layout/PrivateRoutes';
// PAGES:
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
// PAGES: AUTH
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Auth/Dashboard';
import AddCard from './pages/Cards/AddCard';
import CardDetail from './pages/Cards/CardDetail';
import EditCard from './pages/Cards/EditCard';
// PAGES: Card SUB-ROUTES
import CardDeck from './pages/Cards/CardDeck';
// PAGES: CRYPTO SUB-ROUTES
import Ladder from './pages/AFL/Ladder';

function App() {
  return (
    <Routes>
      {/* MAIN LAYOUT WRAPPER & ROUTED CHILDREN */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* AUTH */}
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        {/* PRIVATE AUTH ROUTES */}
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        {/* CURRENCY: API */}
        <Route path="cards">
          <Route path="collection" element={<CardDeck />} />
          <Route path="add" element={<AddCard />} />
          <Route path=":id" element={<CardDetail />} />
          <Route path="edit/:id" element={<EditCard />} />
        </Route>
        {/* CRYPTO: EXTERNAL API */}
        <Route path="afl">
          <Route path="ladder" element={<Ladder />}/>   
        </Route>
        {/* ERROR PAGES */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;