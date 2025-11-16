import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, UserPlus, Brain, Sparkles, LogIn, Globe, User, ChevronDown, Users as UsersIcon, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ModelComparison from '../components/ModelComparison';
import LanguageSelector from '../components/LanguageSelector';
import MixpanelTest from '../components/MixpanelTest';
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
      
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Logo size="md" showText={true} />
              
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => navigate('/about')} className="text-white hover:text-primary transition-colors font-medium">About</button>
                <button onClick={() => navigate('/pricing')} className="text-white hover:text-primary transition-colors font-medium">Pricing</button>
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
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Explore Engineering
          </h1>
          <p className="text-2xl text-text-secondary mb-4 max-w-3xl mx-auto">
            We're helping you build the steps of your engineering career
          </p>
          <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">
            Master aerospace, automotive, and robotics through interactive 3D models, comprehensive lessons, and hands-on simulations
          </p>
          <button onClick={() => navigate('/auth')} className="inline-flex items-center gap-3 px-10 py-4 bg-primary hover:bg-primary-light text-background rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-primary/50 hover:scale-105">
            <UserPlus className="w-6 h-6" />
            <span>Start Your Journey</span>
          </button>
        </section>

        <section className="bg-background-light py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-12 h-12 text-primary" />
                  <h2 className="text-4xl font-bold text-primary">Rocket Mechanics</h2>
                </div>
                <p className="text-xl text-text mb-6">Master the fundamentals of aerospace engineering with our interactive rocket mechanics module.</p>
                <ul className="space-y-4 text-lg text-text-secondary">
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Learn thrust, drag, and orbital mechanics through 3D simulations</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Explore NASA-grade rocket models in real-time 3D</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Understand propulsion systems and flight dynamics</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary text-2xl">✓</span><span>Practice with interactive quizzes and challenges</span></li>
                </ul>
              </div>
              <div className="h-96 bg-background rounded-2xl border-2 border-primary/30 overflow-hidden flex items-center justify-center">
                <Rocket className="w-48 h-48 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-96 bg-background-light rounded-2xl border-2 border-secondary/30 overflow-hidden flex items-center justify-center">
                <Car className="w-48 h-48 text-secondary animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-12 h-12 text-secondary" />
                  <h2 className="text-4xl font-bold text-secondary">Automotive Engineering</h2>
                </div>
                <p className="text-xl text-text mb-6">Dive deep into automotive systems and understand how modern vehicles work.</p>
                <ul className="space-y-4 text-lg text-text-secondary">
                  <li className="flex items-start gap-3"><span className="text-secondary text-2xl">✓</span><span>Study engine mechanics, transmission systems, and powertrains</span></li>
                  <li className="flex items-start gap-3"><span className="text-secondary text-2xl">✓</span><span>Explore suspension, braking, and steering systems in 3D</span></li>
                  <li className="flex items-start gap-3"><span className="text-secondary text-2xl">✓</span><span>Learn aerodynamics and vehicle dynamics</span></li>
                  <li className="flex items-start gap-3"><span className="text-secondary text-2xl">✓</span><span>Interactive simulations of real-world scenarios</span></li>
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

      <footer className="border-t border-primary/20 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-text-muted">
          <p>{t('home.footer.copyright')}</p>
          <p className="text-xs mt-2 text-gray-600">{t('home.footer.version')}</p>
        </div>
      </footer>

      <ModelComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
      <LanguageSelector isOpen={showLangModal} onClose={() => { setShowLangModal(false); if (setShowLanguageSelector) { setShowLanguageSelector(false); }}} />
      {import.meta.env.DEV && <MixpanelTest />}
    </div>
  );
};

export default LandingPage;
