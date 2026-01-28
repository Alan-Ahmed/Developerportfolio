import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    /* Vi tar bort snap-y och h-screen för att låta användaren skrolla helt fritt 
       och för att sektionerna ska kunna ligga tätare. */
    <div className="min-h-screen w-full bg-black text-white selection:bg-teal-500/30">
      
      <Navigation />

      <main className="flex flex-col w-full">
        {/* Hero-sektionen får behålla sin höjd men utan scroll-pilen */}
        <Hero />
        
        {/* Vi omsluter resten i en container med negativt mellanrum 
            om du vill tvinga dem ännu närmare varandra */}
        <div className="flex flex-col">
          <About />
          <TechStack />
          <Projects />
          <Contact />
        </div>
      </main>
      
    </div>
  );
}
