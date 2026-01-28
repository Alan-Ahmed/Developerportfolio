import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    /* 1. Vi använder 'min-h-screen' istället för 'h-screen' för att tillåta innehåll att växa.
      2. 'snap-proximity' på mobil gör att användaren kan skrolla fritt i långa texter.
      3. 'md:snap-mandatory' behåller din snygga desktop-känsla.
    */
    <div className="min-h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth bg-black text-white">
      
      {/* Navigationen ligger fast (fixed) */}
      <Navigation />

      {/* Varje sektion bör ha 'min-h-screen' och 'snap-start' inuti sin egen komponent.
        Jag har lagt dem direkt här för att minimera risken för layout-skiftningar.
      */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      
    </div>
  );
}
