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

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div className={`font-abc ${currentTheme === 'dark' ? 'dark' : ''}`}>
      <div className="absolute top-0 left-0 ">
        <button
          className={`bg-${currentTheme === 'dark' ? 'black' : 'gray'}-700 hover:bg-${currentTheme === 'dark' ? 'white' : 'gray'} w-20 rounded-md p-4`}
          onClick={toggleTheme}
        >
          <Image src={`/assets/${currentTheme === 'dark' ? 'sun' : 'moon'}.svg`} alt="logo" height={20} width={20} />
        </button>
      </div>

      <HomepageNavbar />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </div>
  )
};

export default Index