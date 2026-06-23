import { Navigation } from './components/Navigation.jsx';
import { Hero } from './components/Hero.jsx';
import { WhyNow } from './components/WhyNow.jsx';
import { PlatformModules } from './components/PlatformModules.jsx';
import { LocationAnalyzer } from './components/LocationAnalyzer.jsx';
import { MarketComparison } from './components/MarketComparison.jsx';
import { ScenarioSimulator } from './components/ScenarioSimulator.jsx';
import { DocumentIntelligence } from './components/DocumentIntelligence.jsx';
import { UseCases } from './components/UseCases.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-graphite text-white">
      <Navigation />
      <main>
        <Hero />
        <WhyNow />
        <PlatformModules />
        <LocationAnalyzer />
        <MarketComparison />
        <ScenarioSimulator />
        <DocumentIntelligence />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
}
