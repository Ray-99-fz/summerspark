import { HeroSection } from './components/HeroSection';
import { ProgramsGrid } from './components/ProgramsGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <ProgramsGrid />
    </div>
  );
}