import React from 'react';
import { Navbar } from './components/Navbar';
import { ProblemSection } from './components/ProblemSection';
import { ManifestoSection } from './components/ManifestoSection';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="landing-page-root">
      <Navbar />
      
      <main>
        <ProblemSection />
        <ManifestoSection />
        <WaitlistSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
