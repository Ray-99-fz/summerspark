import { useState } from 'react';
import { ProgramCard } from './ProgramCard';
import { WaitlistModal } from './WaitlistModal';

const programs = [
  {
    title: 'Introduction to 3D in Blender',
    instructor: 'Master Digital Artist',
    description: 'Learn 3D modeling, texturing, and rendering. Create stunning 3D artwork from scratch.',
    theme: 'blender' as const
  },
  {
    title: 'Introduction to Dynamic Sketching',
    instructor: 'Professional Illustrator',
    description: 'Master the fundamentals of drawing with energy, movement, and expression.',
    theme: 'sketching' as const
  },
  {
    title: 'Introduction to Game Development',
    instructor: 'Game Design Expert',
    description: 'Build your first video game and learn the basics of interactive storytelling.',
    theme: 'gamedev' as const
  },
  {
    title: 'Introduction to Traditional Portraiture',
    instructor: 'Portrait Artist',
    description: 'Capture the human form with traditional drawing and painting techniques.',
    theme: 'portraiture' as const
  }
];

export function ProgramsGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleJoinWaitlist = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setModalOpen(true);
  };

  return (
    <>
      <section id="programs" className="relative min-h-screen py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/imports/Red_White_Bold_Simple_Fashion_Introduction_Poster__1_.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black mb-4 text-white tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', textShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
              Choose Your Program
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 400 }}>
              Four unique courses designed to ignite creativity and build foundational skills
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {programs.map((program) => (
              <ProgramCard
                key={program.title}
                {...program}
                onJoinWaitlist={() => handleJoinWaitlist(program.title)}
              />
            ))}
          </div>
        </div>
      </section>

      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedCourse={selectedCourse}
      />
    </>
  );
}
