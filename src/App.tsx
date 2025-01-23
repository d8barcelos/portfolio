import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Add AnimatedBackground outside the main div */}
      <AnimatedBackground />
      
      <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
        <main className="relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <Timeline />
          <Testimonials />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;