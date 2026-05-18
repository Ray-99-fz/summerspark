import { motion } from 'motion/react';
import { Clock, Users, Award } from 'lucide-react';

interface ProgramCardProps {
  title: string;
  instructor: string;
  description: string;
  theme: 'blender' | 'sketching' | 'gamedev' | 'portraiture';
  onJoinWaitlist: () => void;
}

const themeStyles = {
  blender: {
    gradient: 'from-orange-500/20 via-orange-600/20 to-amber-600/20',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    hoverGlow: 'group-hover:shadow-orange-500/40',
    accent: 'bg-gradient-to-r from-orange-500 to-amber-500',
    pattern: '🔶'
  },
  sketching: {
    gradient: 'from-amber-500/20 via-yellow-600/20 to-orange-600/20',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    hoverGlow: 'group-hover:shadow-amber-500/40',
    accent: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    pattern: '✏️'
  },
  gamedev: {
    gradient: 'from-cyan-500/20 via-blue-600/20 to-purple-600/20',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    hoverGlow: 'group-hover:shadow-cyan-500/40',
    accent: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    pattern: '🎮'
  },
  portraiture: {
    gradient: 'from-purple-500/20 via-pink-600/20 to-rose-600/20',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20',
    hoverGlow: 'group-hover:shadow-purple-500/40',
    accent: 'bg-gradient-to-r from-purple-500 to-pink-500',
    pattern: '🎨'
  }
};

export function ProgramCard({ title, instructor, description, theme, onJoinWaitlist }: ProgramCardProps) {
  const styles = themeStyles[theme];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div
        className={`
          relative overflow-hidden rounded-3xl
          bg-gradient-to-br ${styles.gradient}
          backdrop-blur-xl border-2 ${styles.border}
          shadow-2xl ${styles.glow} ${styles.hoverGlow}
          transition-all duration-500
          h-full flex flex-col
        `}
      >
        {/* Thumbnail Placeholder */}
        <div className="relative h-56 bg-gradient-to-br from-black/40 to-black/60 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">
            {styles.pattern}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Decorative elements based on theme */}
          {theme === 'blender' && (
            <div className="absolute top-4 right-4 text-orange-400/40 text-sm font-mono">
              {'<wireframe />'}
            </div>
          )}
          {theme === 'gamedev' && (
            <div className="absolute top-4 left-4 text-cyan-400/40 text-xs font-mono">
              [HUD_ACTIVE]
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{title}</h3>
          <p className="text-orange-200/80 mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>with {instructor}</p>
          <p className="text-white/70 mb-6 flex-1" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>{description}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge icon={<Award className="w-3 h-3" />} text="Beginner Friendly" />
            <Badge icon={<Users className="w-3 h-3" />} text="Ages 8-18" />
            <Badge icon={<Clock className="w-3 h-3" />} text="4 Weeks" />
          </div>

          {/* CTA Button */}
          <button
            onClick={onJoinWaitlist}
            className={`
              w-full py-4 rounded-xl ${styles.accent}
              text-white font-semibold uppercase tracking-wider
              shadow-lg hover:shadow-xl
              transform transition-all duration-300
              hover:scale-105
            `}
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em' }}
          >
            Join Waitlist
          </button>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} blur-xl`} />
        </div>
      </div>
    </motion.div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm">
      {icon}
      <span>{text}</span>
    </div>
  );
}
