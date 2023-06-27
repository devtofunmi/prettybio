import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HomepageNavbar from '../components/HomepageNavbar';
import Faq from '../components/Faq';

const Index = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

 

  return (
    <div className={`font-abc ${currentTheme === 'dark' ? 'dark' : ''}`}>

      <HomepageNavbar />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </div>
  )
};

export default Index