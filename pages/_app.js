import '../styles/globals.css'

import { useEffect } from 'react';
import { initializeAOS } from '../utils/aos';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initializeAOS();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
