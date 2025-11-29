import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, UserPlus, Brain, Sparkles, LogIn, Globe, User, ChevronDown, Users as UsersIcon, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ModelComparison from '../components/ModelComparison';
import LanguageSelector from '../components/LanguageSelector';
import SidebarMenu from '../components/SidebarMenu';
import Logo from '../components/Logo';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, signOut, showLanguageSelector, setShowLanguageSelector } = useAuth();
  const { t } = useTranslation();
  const [showComparison, setShowComparison] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (showLanguageSelector) {
      setShowLangModal(true);
    }
  }, [showLanguageSelector]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <SidebarMenu />
      
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              {/* Spacer for menu button (only when logged in) */}
              <div className="w-10 md:w-14"></div>
              <Logo size="md" showText={true} />
              
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => navigate('/about')} className="text-white hover:text-primary transition-colors font-medium">About</button>
                <button onClick={() => navigate('/pricing')} className="text-white hover:text-primary transition-colors font-medium">Pricing</button>
                <button onClick={() => navigate('/help')} className="text-white hover:text-primary transition-colors font-medium">Help</button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setShowLangModal(true)} className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background-light rounded-lg transition-colors text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.language')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full">
        {/* REDESIGNED HERO SECTION - Mobile Optimized */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-black">
          {/* Animated background elements - hidden on mobile for performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                  Learn Engineering With{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    3D Models, Simulations & AI
                  </span>
                </h1>
                
                <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                  Master rockets, cars, aircraft & electronics through interactive 3D exploded views, 
                  real-time simulations, and AI-powered analysis.
                </p>

                {/* CTA Button - Full width on mobile */}
                <button 
                  onClick={() => navigate('/auth')} 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl transition-all font-bold text-base md:text-lg shadow-lg shadow-cyan-500/50 active:scale-95 md:hover:scale-105 mb-6 md:mb-8"
                >
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Start Learning Free</span>
                </button>

                {/* Stats - Responsive grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 border-t border-gray-700">
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-cyan-400 mb-1">150+</div>
                    <div className="text-xs md:text-sm text-gray-400">MIT-Quality Lessons</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-blue-400 mb-1">50+</div>
                    <div className="text-xs md:text-sm text-gray-400">3D Models</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-purple-400 mb-1">AI</div>
                    <div className="text-xs md:text-sm text-gray-400">Powered Analysis</div>
                  </div>
                </div>
              </div>

              {/* Right: 3D Viewer Preview - Hidden on small mobile, shown on tablet+ */}
              <div className="relative hidden sm:block">
                {/* 3D Viewer Preview Card */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20">
                  {/* Tech corners */}
                  <div className="absolute top-2 left-2 w-6 md:w-8 h-6 md:h-8 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-lg" />
                  <div className="absolute bottom-2 right-2 w-6 md:w-8 h-6 md:h-8 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg" />
                  
                  {/* Preview content */}
                  <div className="p-4 md:p-8 h-64 md:h-96 flex flex-col items-center justify-center">
                    <div className="relative mb-4 md:mb-6">
                      <Rocket className="w-20 h-20 md:w-32 md:h-32 text-cyan-400 animate-pulse" />
                      <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30 animate-pulse" />
                    </div>
                    
                    <h3 className="text-base md:text-xl font-bold text-white mb-2 text-center">Interactive 3D Exploded Views</h3>
                    <p className="text-gray-400 text-center mb-4 text-sm md:text-base">
                      Explore every component in stunning detail
                    </p>
                    
                    {/* Feature badges */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-2 md:px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-300">
                        Auto-Rotate
                      </span>
                      <span className="px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">
                        Part Labels
                      </span>
                      <span className="px-2 md:px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">
                        AI Analysis
                      </span>
                    </div>
                  </div>
                  
                  {/* Bottom bar */}
                  <div className="bg-black/50 backdrop-blur px-4 md:px-6 py-2 md:py-3 border-t border-cyan-500/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cyan-400 font-mono">J.A.R.V.I.S. MODE</span>
                      <span className="text-gray-400 hidden md:inline">Click to explore →</span>
                    </div>
                  </div>
                </div>

                {/* Floating testimonial - Hidden on mobile */}
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-cyan-500/30 p-4 shadow-xl max-w-xs hidden lg:block">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 mb-2">
                        "Finally understand how rockets work! The 3D models make everything click."
                      </p>
                      <p className="text-xs text-gray-500">- Engineering Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-light py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                  <h2 className="text-2xl md:text-4xl font-bold text-primary">Rocket Mechanics</h2>
                </div>
                <p className="text-base md:text-xl text-text mb-4 md:mb-6">Master the fundamentals of aerospace engineering with our interactive rocket mechanics module.</p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-lg text-text-secondary">
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-primary text-lg md:text-2xl">✓</span><span>Learn thrust, drag, and orbital mechanics through 3D simulations</span></li>
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-primary text-lg md:text-2xl">✓</span><span>Explore NASA-grade rocket models in real-time 3D</span></li>
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-primary text-lg md:text-2xl">✓</span><span>Understand propulsion systems and flight dynamics</span></li>
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-primary text-lg md:text-2xl">✓</span><span>Practice with interactive quizzes and challenges</span></li>
                </ul>
              </div>
              <div className="order-1 md:order-2 h-48 md:h-96 bg-background rounded-2xl border-2 border-primary/30 overflow-hidden flex items-center justify-center">
                <Rocket className="w-24 h-24 md:w-48 md:h-48 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="h-48 md:h-96 bg-background-light rounded-2xl border-2 border-secondary/30 overflow-hidden flex items-center justify-center">
                <Car className="w-24 h-24 md:w-48 md:h-48 text-secondary animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-8 h-8 md:w-12 md:h-12 text-secondary" />
                  <h2 className="text-2xl md:text-4xl font-bold text-secondary">Automotive Engineering</h2>
                </div>
                <p className="text-base md:text-xl text-text mb-4 md:mb-6">Dive deep into automotive systems and understand how modern vehicles work.</p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-lg text-text-secondary">
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-secondary text-lg md:text-2xl">✓</span><span>Study engine mechanics, transmission systems, and powertrains</span></li>
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-secondary text-lg md:text-2xl">✓</span><span>Explore suspension, braking, and steering systems in 3D</span></li>
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-secondary text-lg md:text-2xl">✓</span><span>Learn aerodynamics and vehicle dynamics</span></li>
                  <li className="flex items-start gap-2 md:gap-3"><span className="text-secondary text-lg md:text-2xl">✓</span><span>Interactive simulations of real-world scenarios</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-light py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="w-12 h-12 text-primary" />
                  <h2 className="text-4xl font-bold text-primary">Aviation Mechanics</h2>
                </div>
                <p className="text-xl text-text mb-6">Understand the principles of flight and aircraft engineering.</p>
                <ul className="space-y-4 text-lg text-text-secondary">
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Master lift, drag, thrust, and weight principles</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Explore aircraft structures and control surfaces</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Study jet engines and propulsion systems</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Flight dynamics and stability analysis</span></li>
                </ul>
              </div>
              <div className="h-96 bg-background rounded-2xl border-2 border-primary/30 overflow-hidden flex items-center justify-center">
                <Plane className="w-48 h-48 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-96 bg-background-light rounded-2xl border-2 border-accent/30 overflow-hidden flex items-center justify-center">
                <Brain className="w-48 h-48 text-accent animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-12 h-12 text-accent" />
                  <h2 className="text-4xl font-bold text-accent">Robotics Engineering</h2>
                </div>
                <p className="text-xl text-text mb-6">Build intelligent systems and understand modern robotics.</p>
                <ul className="space-y-4 text-lg text-text-secondary">
                  <li className="flex items-start gap-3"><span className="text-accent text-2xl">✓</span><span>Learn kinematics, dynamics, and control systems</span></li>
                  <li className="flex items-start gap-3"><span className="text-accent text-2xl">✓</span><span>Explore sensors, actuators, and robot programming</span></li>
                  <li className="flex items-start gap-3"><span className="text-accent text-2xl">✓</span><span>Study AI and machine learning for robotics</span></li>
                  <li className="flex items-start gap-3"><span className="text-accent text-2xl">✓</span><span>Hands-on simulations and virtual labs</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">What Students Say</h2>
              <p className="text-base md:text-xl text-gray-400">Join thousands learning engineering the interactive way</p>
            </div>

            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 swipe-scroll">
              {/* Testimonial 1 */}
              <div className="min-w-[280px] md:min-w-0 bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex-shrink-0 md:flex-shrink">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">Sarah M.</p>
                    <p className="text-xs md:text-sm text-gray-400">Aerospace Student</p>
                  </div>
                </div>
                <p className="text-gray-300 italic text-sm md:text-base">
                  "The 3D rocket models finally made orbital mechanics click for me. Best engineering platform I've used!"
                </p>
                <div className="flex gap-1 mt-3 md:mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm md:text-base">★</span>
                  ))}
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-blue-500/30 hover:border-blue-500/60 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">James K.</p>
                    <p className="text-sm text-gray-400">Mechanical Engineer</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "J.A.R.V.I.S. Mode is incredible! Scanning car parts with my phone and getting instant explanations is game-changing."
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Maria L.</p>
                    <p className="text-sm text-gray-400">Electronics Student</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "The AI tutor is like having a personal engineering professor available 24/7. Saved me countless hours!"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-green-500/30 hover:border-green-500/60 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Alex T.</p>
                    <p className="text-sm text-gray-400">High School Student</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Finally understand how engines work! The interactive simulations make complex concepts so much easier."
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-orange-500/30 hover:border-orange-500/60 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">David R.</p>
                    <p className="text-sm text-gray-400">Career Changer</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Transitioning to engineering at 30. This platform made it possible. The XP system keeps me motivated!"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-pink-500/30 hover:border-pink-500/60 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Emily C.</p>
                    <p className="text-sm text-gray-400">University Professor</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "I recommend this to all my students. The quality rivals MIT OpenCourseWare but with better interactivity."
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats - Responsive grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-16 text-center">
              <div className="bg-gray-800/50 rounded-xl p-4 md:p-0 md:bg-transparent">
                <div className="text-2xl md:text-4xl font-bold text-cyan-400 mb-1 md:mb-2">10,000+</div>
                <div className="text-xs md:text-base text-gray-400">Active Students</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 md:p-0 md:bg-transparent">
                <div className="text-2xl md:text-4xl font-bold text-blue-400 mb-1 md:mb-2">150+</div>
                <div className="text-xs md:text-base text-gray-400">MIT-Quality Lessons</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 md:p-0 md:bg-transparent">
                <div className="text-2xl md:text-4xl font-bold text-purple-400 mb-1 md:mb-2">4.9/5</div>
                <div className="text-xs md:text-base text-gray-400">Average Rating</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 md:p-0 md:bg-transparent">
                <div className="text-2xl md:text-4xl font-bold text-green-400 mb-1 md:mb-2">95%</div>
                <div className="text-xs md:text-base text-gray-400">Completion Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background-light">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6 text-primary">Ready to Start Your Engineering Journey?</h2>
            <p className="text-2xl text-text-secondary mb-12">Join thousands of students mastering engineering through interactive learning</p>
            <button onClick={() => navigate('/auth')} className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white rounded-xl transition-all font-bold text-xl shadow-2xl hover:scale-105">
              <UserPlus className="w-7 h-7" />
              <span>Get Started Free</span>
            </button>
          </div>
        </section>
      </div>

      <footer className="border-t border-primary/20 mt-20 py-10 bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-6 mb-6">
            <a 
              href="mailto:youseflovemessi@gmail.com" 
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline"
            >
              Help
            </a>
            <span className="text-gray-500 text-2xl">|</span>
            <a 
              href="/privacy" 
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline"
            >
              Privacy
            </a>
            <span className="text-gray-500 text-2xl">|</span>
            <a 
              href="/terms" 
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline"
            >
              Terms
            </a>
          </div>
          <p className="text-gray-400">{t('home.footer.copyright')}</p>
          <p className="text-xs mt-2 text-gray-600">{t('home.footer.version')}</p>
        </div>
      </footer>

      <ModelComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
      <LanguageSelector isOpen={showLangModal} onClose={() => { setShowLangModal(false); if (setShowLanguageSelector) { setShowLanguageSelector(false); }}} />
    </div>
  );
};

export default LandingPage;
