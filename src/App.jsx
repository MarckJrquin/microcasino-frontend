import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/slices/theme';
import useLocalStorage from "use-local-storage";

import AppRoutes from './routes/AppRoutes';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Toaster from './components/Toaster';


function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const switchTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
        <Nav />
        <AppRoutes />
        <Footer />
        <Toaster />
    </>
  )
}

export default App
