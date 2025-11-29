import { useState } from 'react';
import { BookOpen, Trophy, Clock, Target, Award, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';

const courseData = {
  rockets: {
    title: 'Rocket Engineering',
    subtitle: 'Master the Science of Space Propulsion',
    icon: '🚀',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    bgGradient: 'from-indigo-950 via-purple-950 to-black',
    accentColor: 'cyan',
    description: 'Embark on an incredible journey through aerospace engineering. Learn how rockets defy gravity, master orbital mechanics, and understand the technology that takes humanity to the stars.',
    highlights: [
      'Understand rocket propulsion and the Tsiolkovsky equation',
      'Master orbital mechanics and trajectory design',
      'Learn about rocket structures and materials',
      'Explore avionics and guidance systems',
      'Design your own rocket in the capstone project'
    ],
    skills: ['Propulsion Systems', 'Orbital Mechanics', 'Structural Analysis', 'Avionics', 'Mission Planning'],
    certification: 'Rocket Engineering Certificate',
    estimatedTime: '40+ hours',
    difficulty: 'Beginner to Advanced'
  },
  planes: {
    title: 'Aircraft Engineering',
    subtitle: 'Discover the Art of Flight',
    icon: '✈️',
    gradient: 'from-sky-600 via-blue-600 to-indigo-600',
    bgGradient: 'from-sky-950 via-blue-950 to-black',
    accentColor: 'sky',
    description: 'Soar through the fundamentals of aeronautical engineering. From lift and drag to jet propulsion, master the principles that keep aircraft flying safely through the skies.',
    highlights: [
      'Understand aerodynamics and airfoil design',
      'Learn about lift, drag, and thrust forces',
      'Master aircraft propulsion systems',
      'Explore flight control and stability',
      'Study aircraft maintenance and safety'
    ],
    skills: ['Aerodynamics', 'Propulsion', 'Flight Controls', 'Structures', 'Maintenance'],
    certification: 'Aircraft Engineering Certificate',
    estimatedTime: '35+ hours',
    difficulty: 'Beginner to Advanced'
  },
  cars: {
    title: 'Automotive Engineering',
    subtitle: 'Engineer the Future of Transportation',
    icon: '🚗',
    gradient: 'from-orange-600 via-red-600 to-rose-600',
    bgGradient: 'from-orange-950 via-red-950 to-black',
    accentColor: 'orange',
    description: 'Drive into the world of automotive engineering. From engine dynamics to electric vehicles, learn how modern cars are designed, built, and optimized for performance.',
    highlights: [
      'Master vehicle dynamics and handling',
      'Understand powertrain systems and transmissions',
      'Learn about suspension and steering design',
      'Explore automotive electronics and ECUs',
      'Study safety systems and crash testing'
    ],
    skills: ['Vehicle Dynamics', 'Powertrain', 'Electronics', 'Safety Systems', 'Performance'],
    certification: 'Automotive Engineering Certificate',
    estimatedTime: '35+ hours',
    difficulty: 'Beginner to Advanced'
  },
  electronics: {
    title: 'Electronics Engineering',
    subtitle: 'Build the Technology of Tomorrow',
    icon: '⚡',
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-600',
    bgGradient: 'from-purple-950 via-violet-950 to-black',
    accentColor: 'purple',
    description: 'Power up your knowledge of electronics and embedded systems. From basic circuits to microcontrollers, learn to design and build the electronic systems that power our world.',
    highlights: [
      'Master circuit analysis and Ohm\'s Law',
      'Learn digital logic and microcontrollers',
      'Understand sensors and data acquisition',
      'Explore communication protocols (I2C, SPI, UART)',
      'Build real-world electronic projects'
    ],
    skills: ['Circuit Design', 'Microcontrollers', 'Sensors', 'Communication', 'Embedded Systems'],
    certification: 'Electronics Engineering Certificate',
    estimatedTime: '30+ hours',
    difficulty: 'Beginner to Advanced'
  },
  civil: {
    title: 'Civil Engineering',
    subtitle: 'Shape the World Around You',
    icon: '🏗️',
    gradient: 'from-amber-600 via-yellow-600 to-orange-600',
    bgGradient: 'from-amber-950 via-yellow-950 to-black',
    accentColor: 'amber',
    description: 'Build the foundations of modern infrastructure. From structural analysis to water systems, learn how civil engineers design the buildings, bridges, and systems that support society.',
    highlights: [
      'Understand structural mechanics and load analysis',
      'Learn surveying and site planning',
      'Master construction materials and properties',
      'Explore hydraulics and water systems',
      'Study foundation design and geotechnics'
    ],
    skills: ['Structural Analysis', 'Surveying', 'Materials', 'Hydraulics', 'Construction'],
    certification: 'Civil Engineering Certificate',
    estimatedTime: '25+ hours',
    difficulty: 'Beginner to Advanced'
  }
};

export default function CourseIntro({ subject, totalLessons, totalQuizzes, completedLessons, onStart }) {
  const [isVisible, setIsVisible] = useState(true);
  const course = courseData[subject];

  if (!course || !isVisible) return null;

  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isStarted = completedLessons > 0;
  const isCompleted = completedLessons >= totalLessons;

  const handleStart = () => {
    setIsVisible(false);
    if (onStart) onStart();
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-gradient-to-br ${course.bgGradient} overflow-y-auto`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-7xl md:text-8xl mb-4 animate-bounce">{course.icon}</div>
            <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent mb-3`}>
              {course.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80">{course.subtitle}</p>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8 mb-6">
            {/* Description */}
            <p className="text-lg text-white/90 text-center mb-8 leading-relaxed">
              {course.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <BookOpen className={`w-8 h-8 mx-auto mb-2 text-${course.accentColor}-400`} />
                <div className="text-3xl font-bold text-white">{totalLessons}</div>
                <div className="text-sm text-white/70">Lessons</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Target className={`w-8 h-8 mx-auto mb-2 text-${course.accentColor}-400`} />
                <div className="text-3xl font-bold text-white">{totalQuizzes}</div>
                <div className="text-sm text-white/70">Quizzes</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Clock className={`w-8 h-8 mx-auto mb-2 text-${course.accentColor}-400`} />
                <div className="text-xl font-bold text-white">{course.estimatedTime}</div>
                <div className="text-sm text-white/70">Duration</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Trophy className={`w-8 h-8 mx-auto mb-2 text-yellow-400`} />
                <div className="text-xl font-bold text-white">Certificate</div>
                <div className="text-sm text-white/70">On Completion</div>
              </div>
            </div>

            {/* Progress (if started) */}
            {isStarted && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Your Progress</span>
                  <span className="text-white font-bold">{completedLessons}/{totalLessons} Lessons</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${course.gradient} transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-center mt-2 text-white/70">{progressPercent.toFixed(0)}% Complete</div>
              </div>
            )}

            {/* What You'll Learn */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className={`w-5 h-5 text-${course.accentColor}-400`} />
                What You'll Learn
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                    <CheckCircle className={`w-5 h-5 text-${course.accentColor}-400 flex-shrink-0 mt-0.5`} />
                    <span className="text-white/90 text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className={`w-5 h-5 text-${course.accentColor}-400`} />
                Skills You'll Gain
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={`px-4 py-2 bg-gradient-to-r ${course.gradient} rounded-full text-white text-sm font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold text-white mb-2">{course.certification}</h3>
              <p className="text-white/70 text-sm">
                Complete all lessons and quizzes to earn your official certificate. 
                Share it on LinkedIn and showcase your engineering expertise!
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleStart}
            className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-xl group`}
          >
            {isCompleted ? (
              <>
                <Trophy className="w-7 h-7" />
                View Your Achievement
              </>
            ) : isStarted ? (
              <>
                <BookOpen className="w-7 h-7" />
                Continue Learning
              </>
            ) : (
              <>
                <Sparkles className="w-7 h-7" />
                Start Your Journey
              </>
            )}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Difficulty Badge */}
          <div className="text-center mt-4">
            <span className="text-white/60 text-sm">Difficulty: {course.difficulty}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
