import { useState } from 'react';
import { X, Instagram, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const APIURL = import.meta.env.VITE_REG_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: string;
}

export function WaitlistModal({
  isOpen,
  onClose,
  selectedCourse
}: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    school: '',
    preferredCommunication: 'WhatsApp'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      school: formData.school,
      preferred_communication: formData.preferredCommunication,
      course: selectedCourse
    };

    try {
      const response = await fetch(`${APIURL}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    setLoading(false);

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      school: '',
      preferredCommunication: 'WhatsApp'
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg max-h-[95vh]"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-2xl border border-white/40 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">

                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 pointer-events-none" />

                <button
                  onClick={resetAndClose}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                <div className="overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 relative">

                  {!submitted ? (
                    <>
                      <h2
                        className="text-3xl sm:text-4xl font-black mb-2 uppercase tracking-wider pr-10"
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          background:
                            'linear-gradient(to right, #ea580c, #db2777, #9333ea)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        Join the Waitlist
                      </h2>

                      <p
                        className="text-gray-600 mb-6"
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        Secure your spot in Summer Spark
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                          <label className="block text-sm mb-2 text-gray-700 font-medium">
                            Selected Course
                          </label>
                          <input
                            type="text"
                            value={selectedCourse}
                            disabled
                            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-200 text-gray-700 font-semibold"
                          />
                        </div>

                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none"
                        />

                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none"
                        />

                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+265..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none"
                        />

                        <input
                          type="number"
                          name="age"
                          required
                          min="8"
                          max="18"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Age"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none"
                        />

                        <input
                          type="text"
                          name="school"
                          required
                          value={formData.school}
                          onChange={handleInputChange}
                          placeholder="School"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none"
                        />

                        <select
                          name="preferredCommunication"
                          value={formData.preferredCommunication}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none"
                        >
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Email">Email</option>
                          <option value="Phone Call">Phone Call</option>
                        </select>

                        {error && (
                          <div className="p-3 rounded-xl bg-red-100 text-red-700 text-sm">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all uppercase tracking-wider disabled:opacity-70"
                          style={{
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '1.1rem'
                          }}
                        >
                          {loading
                            ? 'Submitting...'
                            : 'Join Summer Waitlist'}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-5xl mb-4">🎉</div>

                      <h2
                        className="text-3xl sm:text-4xl font-black mb-4 uppercase"
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          background:
                            'linear-gradient(to right, #ea580c, #db2777, #9333ea)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        You're on the waitlist!
                      </h2>

                      <p className="text-gray-600 mb-6">
                        We’ll contact you soon about {selectedCourse}
                      </p>

                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-4">
                          Follow us for updates
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">

                          <a
                            href="https://instagram.com/digitalartacademymw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          >
                            <Instagram className="w-4 h-4" />
                            <span className="text-sm">
                              @digitalartacademymw
                            </span>
                          </a>

                          <a
                            href="https://tiktok.com/@digitalartsacademy.mw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white"
                          >
                            <Music2 className="w-4 h-4" />
                            <span className="text-sm">
                              @digitalartsacademy.mw
                            </span>
                          </a>
                        </div>
                      </div>

                      <button
                        onClick={resetAndClose}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gray-100 hover:bg-gray-200"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}













































// import { useState } from 'react';
// import { X, Instagram, Music2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';

// interface WaitlistModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedCourse: string;
// }

// export function WaitlistModal({ isOpen, onClose, selectedCourse }: WaitlistModalProps) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     age: '',
//     school: '',
//     preferredCommunication: 'WhatsApp',
//     course: selectedCourse
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const resetAndClose = () => {
//     setSubmitted(false);
//     setFormData({
//       fullName: '',
//       email: '',
//       phone: '',
//       age: '',
//       school: '',
//       preferredCommunication: 'WhatsApp',
//       course: selectedCourse
//     });
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={resetAndClose}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//           />

//           {/* Modal */}
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="relative w-full max-w-md pointer-events-auto"
//             >
//               <div className="relative rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-2xl border-2 border-white/50 shadow-2xl overflow-hidden">
//                 {/* Decorative gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 pointer-events-none" />

//                 {/* Close button */}
//                 <button
//                   onClick={resetAndClose}
//                   className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-700" />
//                 </button>

//                 <div className="relative p-8">
//                   {!submitted ? (
//                     <>
//                       <h2 className="text-4xl font-black mb-2 uppercase tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', background: 'linear-gradient(to right, #ea580c, #db2777, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                         Join the Waitlist
//                       </h2>
//                       <p className="text-gray-600 mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>Secure your spot in Summer Spark!</p>

//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         {/* Course (auto-filled) */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>Selected Course</label>
//                           <input
//                             type="text"
//                             value={selectedCourse}
//                             disabled
//                             className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-200 text-gray-700 font-semibold uppercase"
//                             style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.05em' }}
//                           />
//                         </div>

//                         {/* Full Name */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>Full Name</label>
//                           <input
//                             type="text"
//                             name="fullName"
//                             required
//                             value={formData.fullName}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
//                             placeholder="Enter your full name"
//                           />
//                         </div>

//                         {/* Email */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>Email</label>
//                           <input
//                             type="email"
//                             name="email"
//                             required
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
//                             placeholder="your@email.com"
//                           />
//                         </div>

//                         {/* Phone */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>Phone Number</label>
//                           <input
//                             type="tel"
//                             name="phone"
//                             required
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
//                             placeholder="+265 123 456 789"
//                           />
//                         </div>

//                         {/* Age */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>Age of Participant</label>
//                           <input
//                             type="number"
//                             name="age"
//                             required
//                             min="8"
//                             max="18"
//                             value={formData.age}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
//                             placeholder="Age (8-18)"
//                           />
//                         </div>

//                         {/* School */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>School</label>
//                           <input
//                             type="text"
//                             name="school"
//                             required
//                             value={formData.school}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
//                             placeholder="School name"
//                           />
//                         </div>

//                         {/* Preferred Communication */}
//                         <div>
//                           <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>Preferred Communication</label>
//                           <select
//                             name="preferredCommunication"
//                             value={formData.preferredCommunication}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
//                           >
//                             <option value="WhatsApp">WhatsApp</option>
//                             <option value="Email">Email</option>
//                             <option value="Phone Call">Phone Call</option>
//                           </select>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                           type="submit"
//                           className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
//                           style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em' }}
//                         >
//                           Join Summer Waitlist
//                         </button>
//                       </form>
//                     </>
//                   ) : (
//                     <div className="text-center py-8">
//                       <div className="text-6xl mb-4">🎉</div>
//                       <h2 className="text-4xl font-black mb-4 uppercase tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', background: 'linear-gradient(to right, #ea580c, #db2777, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                         You're on the waitlist!
//                       </h2>
//                       <p className="text-gray-600 mb-8" style={{ fontFamily: 'Oswald, sans-serif' }}>
//                         We'll be in touch soon with more details about {selectedCourse}.
//                       </p>

//                       {/* Socials */}
//                       <div className="space-y-3 mb-8">
//                         <p className="text-sm text-gray-500">Follow us for updates:</p>
//                         <div className="flex gap-3 justify-center">
//                           <a
//                             href="https://instagram.com/digitalartacademymw"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
//                           >
//                             <Instagram className="w-4 h-4" />
//                             <span className="text-sm">@digitalartacademymw</span>
//                           </a>
//                           <a
//                             href="https://tiktok.com/@digitalartsacademy.mw"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:shadow-lg transition-all"
//                           >
//                             <Music2 className="w-4 h-4" />
//                             <span className="text-sm">@digitalartsacademy.mw</span>
//                           </a>
//                         </div>
//                       </div>

//                       <button
//                         onClick={resetAndClose}
//                         className="px-8 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }
