import { ChevronDown } from 'lucide-react';
import Logo from '../../assets/Logo.png';

export function HeroSection() {
  const scrollToPrograms = () => {
    document
      .getElementById('programs')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-amber-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-pink-700/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.3),transparent_50%)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Logo */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <img
                src={Logo}
                alt="Digital Art Academy"
                className="h-20 sm:h-24 md:h-28 w-auto drop-shadow-2xl"
              />
              <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full -z-10" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 text-white">
            <span
              className="block text-7xl md:text-9xl lg:text-[12rem] font-black tracking-wider"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                letterSpacing: '0.05em',
                textShadow:
                  '4px 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)'
              }}
            >
              SUMMER
            </span>
            <span
              className="block text-7xl md:text-9xl lg:text-[12rem] font-black tracking-wider"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                letterSpacing: '0.05em',
                textShadow:
                  '4px 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)'
              }}
            >
              SPARK
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed uppercase tracking-wide"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            Digital <span className="text-orange-300">and</span> Traditional
            Art Holiday Lessons for Primary{' '}
            <span className="text-orange-300">and</span> High School Students
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-16">
            <InfoBadge icon="🗓️" text="Starts 15 July" />
            <InfoBadge icon="📅" text="4 Weeks" />
            <InfoBadge icon="🎨" text="3 Classes Per Week" />
            <InfoBadge icon="⚡" text="Limited Spaces" />
          </div>

          <button
            onClick={scrollToPrograms}
            className="group inline-flex flex-col items-center gap-2 text-white hover:text-orange-200 transition-all duration-300"
          >
            <span
              className="text-sm uppercase tracking-wider"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Choose your creative program
            </span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

function InfoBadge({
  icon,
  text
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 transition-all duration-300">
      <span className="mr-2">{icon}</span>
      <span style={{ fontFamily: 'Oswald, sans-serif' }}>{text}</span>
    </div>
  );
}