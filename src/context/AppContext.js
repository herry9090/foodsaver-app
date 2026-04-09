'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // null when not logged in
  const [reports, setReports] = useState([]);
  const [points, setPoints] = useState(0);
  const [theme, setTheme] = useState('light');
  
  // Initialize from local storage to persist mock data
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Mock user login for demo if desired
    const savedUser = localStorage.getItem('foodsaver_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Mock reports
    const savedReports = localStorage.getItem('foodsaver_reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      setReports([
        { id: 1, title: 'Leftover Buffet Food', location: 'Downtown Hotel', status: 'approved', points: 10, date: '2026-04-01' },
      ]);
    }
    
    const savedPoints = localStorage.getItem('foodsaver_points');
    if (savedPoints) {
      setPoints(Number(savedPoints));
    } else {
      setPoints(10);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('foodsaver_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodsaver_user');
  };

  const addReport = (reportData) => {
    const newReport = { ...reportData, id: Date.now(), status: 'pending', date: new Date().toISOString().split('T')[0] };
    const newReports = [newReport, ...reports];
    setReports(newReports);
    localStorage.setItem('foodsaver_reports', JSON.stringify(newReports));
    
    // Add points asynchronously maybe?
    // Let's add them immediately for demo
    const newPoints = points + 10;
    setPoints(newPoints);
    localStorage.setItem('foodsaver_points', newPoints.toString());
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, reports, addReport, points, theme, toggleTheme, setPoints }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
