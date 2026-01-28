import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    /* HÄR ÄR FIXEN FÖR "HÅLLNINGEN":
       1. snap-y snap-proximity på mobil gör att det inte känns "låst" om texten är lång.
       2. md:snap-mandatory på dator behåller den proffsiga känslan.
       3. bg-black säkerställer att det inte blir vita glimtar mellan sektioner.
    */
    <div className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth bg-black">
      
      {/* Navigeringen ligger utanför flödet (fixed) och styrs av sin egen komponent */}
      <Navigation />

      {/* Varje sektion har id som matchar Navbarens länkar */}
      <main className="w-full">
        <section id="hero" className="snap-start">
          <Hero />
        </section>

        <section id="about" className="snap-start">
          <About />
        </section>

        <section id="tech" className="snap-start">
          <TechStack />
        </section>

        <section id="projects" className="snap-start">
          <Projects />
        </section>

        <section id="contact" className="snap-start">
          <Contact />
        </section>
      </main>

    </div>
  );
}
