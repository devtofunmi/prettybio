import '../styles/globals.css'
import { useEffect } from 'react';
import { initializeAOS } from '../utils/aos';
import { UserProvider } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp;
