import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    /* FIX: Vi använder 100dvh (dynamic viewport height) för att 
      säkerställa att botten inte klipps av på mobiler med sökfält. 
    */
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth bg-black text-white">
      
      {/* Navigationen är fast (fixed) och påverkas inte av scrollen */}
      <Navigation />

      {/* Här tar vi bort onödiga main-wrappers som kan störa snap-positionering. 
        Varje komponent sköter sin egen snap-start.
      */}
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      
    </div>
  );
}
