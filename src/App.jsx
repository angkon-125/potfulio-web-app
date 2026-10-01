import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import SkillSection from './components/SkillSection';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AIAssistant from './components/AIAssistant';
import { usePortfolioData } from './hooks/usePortfolioData';
import './App.css';

const Layout = ({ children, ownerName }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer name={ownerName} />}
    </>
  );
};

const Portfolio = ({ portfolioData }) => {
  const { data } = portfolioData;

  return (
    <main>
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Projects projects={data.projects} />
      <SkillSection skills={data.profile.skills} />
      <Experience experience={data.profile.experience} />
      <Contact profile={data.profile} />
      <AIAssistant profile={data.profile} />
    </main>
  );
};

function App() {
  const portfolioData = usePortfolioData();

  return (
    <Router>
      <Layout ownerName={portfolioData.data.profile.name}>
        <Routes>
          <Route path="/" element={<Portfolio portfolioData={portfolioData} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard portfolioData={portfolioData} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
