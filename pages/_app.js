import '../styles/globals.css'
import { useEffect } from 'react';
import { initializeAOS } from '../utils/aos';
import { ThemeProvider } from "next-themes"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
  <ThemeProvider enableSystem={true} attribute="class">
  <Component {...pageProps} />;
  </ThemeProvider>
  )
}

export default MyApp;
