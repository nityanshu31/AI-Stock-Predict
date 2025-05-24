import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  
  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  
  const getMarketStatus = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const day = currentTime.getDay();
    
    
    if (day >= 1 && day <= 5 && ((hours === 9 && minutes >= 30) || (hours > 9 && hours < 16))) {
      return { status: "OPEN", color: "text-green-500" };
    } else {
      return { status: "CLOSED", color: "text-red-400" };
    }
  };

  const marketStatus = getMarketStatus();

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg" 
          : "bg-gradient-to-r from-gray-900 to-gray-800"
      }`}>
        
        <div className="bg-gray-950 py-1 px-4 text-xs text-gray-400">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2">NYSE</span>
                <span className={marketStatus.color}>{marketStatus.status}</span>
              </div>
              <div className="hidden sm:block">
                <span>{formatTime()} EST</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center">
                  <span className="mr-1">S&P 500</span>
                  <span className="text-green-400">+1.2%</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">NASDAQ</span>
                  <span className="text-green-400">+0.8%</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">DOW</span>
                  <span className="text-red-400">-0.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
          
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  StockAI
                </span>
                <span className="text-xs text-blue-400 ml-1 hidden sm:inline-block">PREDICTOR</span>
              </div>
            </Link>

          
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" active={location.pathname === "/"}>
                Home
              </NavLink>
              <NavLink to="/predict" active={location.pathname === "/predict"}>
                Predict
              </NavLink>
              <NavLink to="/portfolio" active={location.pathname === "/portfolio"}>
                Portfolio
              </NavLink>
              <NavLink to="/charts" active={location.pathname === "/charts"}>
                Charts
              </NavLink>
              
             
            </div>

           
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
       
        {isOpen && (
          <div className="md:hidden bg-gray-800 shadow-xl animate-fadeIn">
            <div className="px-4 py-2 space-y-1">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)} active={location.pathname === "/"}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/predict" onClick={() => setIsOpen(false)} active={location.pathname === "/predict"}>
                Predict
              </MobileNavLink>
              <MobileNavLink to="/portfolio" onClick={() => setIsOpen(false)} active={location.pathname === "/portfolio"}>
                Portfolio
              </MobileNavLink>
              <MobileNavLink to="/charts" onClick={() => setIsOpen(false)} active={location.pathname === "/charts"}>
                Charts
              </MobileNavLink>
              
            </div>
          </div>
        )}
      </nav>
      
  
      <div className="h-24"></div>
    </>
  );
};


const NavLink = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
        active 
          ? "bg-gray-800 text-blue-400" 
          : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
      }`}
    >
      {children}
    </Link>
  );
};


const MobileNavLink = ({ to, active, onClick, children }) => {
  return (
    <Link 
      to={to} 
      className={`block px-3 py-2 rounded-lg ${
        active 
          ? "bg-gray-700 text-blue-400" 
          : "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;