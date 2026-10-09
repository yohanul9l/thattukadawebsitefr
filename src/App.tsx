import { useState } from 'react';
import { ambientSound } from './utils/audioAmbience';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServerExperience } from './components/ServerExperience';
import { CommunityRules } from './components/CommunityRules';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const newState = ambientSound.toggle();
    setIsAudioPlaying(newState);
  };

  return (
    <div className="min-h-screen bg-[#080d11] text-[#e2e8f0] flex flex-col selection:bg-amber-500/25 selection:text-amber-200">
      {/* Top Bar navigation */}
      <Navbar
        onJoinClick={() => setIsJoinModalOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      <main className="flex-1">
        {/* Clean, fancy, minimalistic Hero section */}
        <Hero onJoinClick={() => setIsJoinModalOpen(true)} />

        {/* Server Channels & Voice Experience Mockup */}
        <ServerExperience />

        {/* Community House Rules */}
        <CommunityRules />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onJoinClick={() => setIsJoinModalOpen(true)} />

      {/* Join Discord Invitation Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
