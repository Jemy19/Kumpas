import React from 'react';
import Analytics from '@/components/homecomp/Analytics';
import Cards from '@/components/homecomp/Cards';
import Footer from '@/components/homecomp/Footer';
import Hero from '@/components/homecomp/Hero';
import Navbar from '@/components/homecomp/Navbar';
import Newsletter from '@/components/homecomp/Newsletter';

export function Home() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;