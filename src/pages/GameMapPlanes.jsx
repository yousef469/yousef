import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Lock, CheckCircle, Trophy, BookOpen, Brain } from 'lucide-react';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const [completedNodes, setCompletedNodes] = useState([0]);

  // Generate all nodes (lessons + quizzes)
  const generateNodes = () => {
    const nodes = [];
    let nodeId = 0;

    // BEGINNER - 36 lessons + 36 quizzes (1 quiz per lesson)
    const beginnerUnits = [
      { name: 'Introduction to Flight', emoji: '🛫' },
      { name: 'Basic Aerodynamics', emoji: '💨' },
      { name: 'Aircraft Parts', emoji: '✈️' },
      { name: 'Forces of Flight', emoji: '⬆️' },
      { name: 'Takeoff & Landing', emoji: '🛬' },
      { name: 'Basic Navigation', emoji: '🧭' }
    ];

    beginnerUnits.forEach((unit, unitIndex) => {
      // Unit header
      nodes.push({
        id: nodeId++,
        type: 'unit',
        level: 'Beginner',
        unitNumber: unitIndex + 1,
        name: unit.name,
        emoji: unit.emoji,
        color: 'from-green-400 to-emerald-500'
      });

      // 6 lessons per unit
      for (let i = 0; i < 6; i++) {
        nodes.push({
          id: nodeId++,
          type: 'lesson',
          level: 'Beginner',
          unitNumber: unitIndex + 1,
          lessonNumber: i + 1,
          name: `${unit.name} - Part ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-green-400 to-emerald-500'
        });

        // 1 quiz after each lesson
        nodes.push({
          id: nodeId++,
          type: 'quiz',
          level: 'Beginner',
          unitNumber: unitIndex + 1,
          quizNumber: i + 1,
          name: `Quiz ${i + 1}`,
          color: 'from-green-500 to-green-600'
        });
      }
    });

    // INTERMEDIATE - 42 lessons + 84 quizzes (2 quizzes per lesson)
    const intermediateUnits = [
      { name: 'Wing Design', emoji: '🪽' },
      { name: 'Engine Systems', emoji: '⚙️' },
      { name: 'Flight Controls', emoji: '🎮' },
      { name: 'Weather & Flight', emoji: '⛈️' },
      { name: 'Instrument Flying', emoji: '📊' },
      { name: 'Air Traffic Control', emoji: '📡' }
    ];

    intermediateUnits.forEach((unit, unitIndex) => {
      nodes.push({
        id: nodeId++,
        type: 'unit',
        level: 'Intermediate',
        unitNumber: unitIndex + 7,
        name: unit.name,
        emoji: unit.emoji,
        color: 'from-blue-400 to-cyan-500'
      });

      for (let i = 0; i < 7; i++) {
        nodes.push({
          id: nodeId++,
          type: 'lesson',
          level: 'Intermediate',
          unitNumber: unitIndex + 7,
          lessonNumber: i + 1,
          name: `${unit.name} - Part ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-blue-400 to-cyan-500'
        });

        // 2 quizzes per lesson
        for (let q = 0; q < 2; q++) {
          nodes.push({
            id: nodeId++,
            type: 'quiz',
            level: 'Intermediate',
            unitNumber: unitIndex + 7,
            quizNumber: (i * 2) + q + 1,
            name: `Quiz ${(i * 2) + q + 1}`,
            color: 'from-blue-500 to-blue-600'
          });
        }
      }
    });

    // ADVANCED - 48 lessons + 96 quizzes (2 quizzes per lesson)
    const advancedUnits = [
      { name: 'Advanced Aerodynamics', emoji: '🌪️' },
      { name: 'Jet Propulsion', emoji: '🚀' },
      { name: 'High-Speed Flight', emoji: '⚡' },
      { name: 'Aircraft Performance', emoji: '📈' },
      { name: 'Emergency Procedures', emoji: '🚨' },
      { name: 'Complex Systems', emoji: '🔧' }
    ];

    advancedUnits.forEach((unit, unitIndex) => {
      nodes.push({
        id: nodeId++,
        type: 'unit',
        level: 'Advanced',
        unitNumber: unitIndex + 13,
        name: unit.name,
        emoji: unit.emoji,
        color: 'from-purple-400 to-pink-500'
      });

      for (let i = 0; i < 8; i++) {
        nodes.push({
          id: nodeId++,
          type: 'lesson',
          level: 'Advanced',
          unitNumber: unitIndex + 13,
          lessonNumber: i + 1,
          name: `${unit.name} - Part ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-purple-400 to-pink-500'
        });

        // 2 quizzes per lesson
        for (let q = 0; q < 2; q++) {
          nodes.push({
            id: nodeId++,
            type: 'quiz',
            level: 'Advanced',
            unitNumber: unitIndex + 13,
            quizNumber: (i * 2) + q + 1,
            name: `Quiz ${(i * 2) + q + 1}`,
            color: 'from-purple-500 to-purple-600'
          });
        }
      }
    });

    // EXPERT - 40 lessons + 90 quizzes
    const expertUnits = [
      { name: 'Supersonic Flight', emoji: '💥' },
      { name: 'Military Aviation', emoji: '🎖️' },
      { name: 'Test Pilot Training', emoji: '🧪' },
      { name: 'Aerobatic Maneuvers', emoji: '🎪' },
      { name: 'Advanced Navigation', emoji: '🗺️' }
    ];

    expertUnits.forEach((unit, unitIndex) => {
      nodes.push({
        id: nodeId++,
        type: 'unit',
        level: 'Expert',
        unitNumber: unitIndex + 19,
        name: unit.name,
        emoji: unit.emoji,
        color: 'from-orange-400 to-red-500'
      });

      for (let i = 0; i < 8; i++) {
        nodes.push({
          id: nodeId++,
          type: 'lesson',
          level: 'Expert',
          unitNumber: unitIndex + 19,
          lessonNumber: i + 1,
          name: `${unit.name} - Part ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-orange-400 to-red-500'
        });

        // Distribute 90 quizzes across 40 lessons (some lessons have 2, some have 3)
        const quizzesForThisLesson = (unitIndex * 8 + i) < 10 ? 3 : 2;
        for (let q = 0; q < quizzesForThisLesson; q++) {
          nodes.push({
            id: nodeId++,
            type: 'quiz',
            level: 'Expert',
            unitNumber: unitIndex + 19,
            name: `Quiz`,
            color: 'from-orange-500 to-red-600'
          });
        }
      }
    });

    // MASTER - 45 lessons + 120 quizzes
    const masterUnits = [
      { name: 'Aircraft Design', emoji: '📐' },
      { name: 'Future of Aviation', emoji: '🔮' },
      { name: 'Space Planes', emoji: '🛸' },
      { name: 'Aviation Engineering', emoji: '🏗️' },
      { name: 'Master Certification', emoji: '🏆' }
    ];

    masterUnits.forEach((unit, unitIndex) => {
      nodes.push({
        id: nodeId++,
        type: 'unit',
        level: 'Master',
        unitNumber: unitIndex + 24,
        name: unit.name,
        emoji: unit.emoji,
        color: 'from-yellow-400 to-amber-500'
      });

      for (let i = 0; i < 9; i++) {
        nodes.push({
          id: nodeId++,
          type: 'lesson',
          level: 'Master',
          unitNumber: unitIndex + 24,
          lessonNumber: i + 1,
          name: `${unit.name} - Part ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-yellow-400 to-amber-500'
        });

        // Distribute 120 quizzes across 45 lessons (average 2.67 per lesson)
        const quizzesForThisLesson = i % 3 === 0 ? 3 : 2;
        for (let q = 0; q < quizzesForThisLesson; q++) {
          nodes.push({
            id: nodeId++,
            type: 'quiz',
            level: 'Master',
            unitNumber: unitIndex + 24,
            name: `Quiz`,
            color: 'from-yellow-500 to-amber-600'
          });
        }
      }
    });

    return nodes;
  };

  const nodes = generateNodes();
  const isNodeUnlocked = (nodeId) => nodeId === 0 || completedNodes.includes(nodeId - 1);
  const isNodeCompleted = (nodeId) => completedNodes.includes(nodeId);

  const handleNodeClick = (node) => {
    if (isNodeUnlocked(node.id)) {
      if (node.type === 'lesson') {
        navigate(`/games/play/planes/lesson/${node.id}`);
      } else if (node.type === 'quiz') {
        navigate(`/games/play/planes/quiz/${node.id}`);
      }
    }
  };

  // Calculate position for zigzag pattern
  const getNodePosition = (index) => {
    const pattern = index % 6;
    const positions = ['50%', '30%', '20%', '40%', '60%', '70%'];
    return positions[pattern];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-400 to-indigo-600 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/20 bg-blue-900/90 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Plane className="w-7 h-7 text-cyan-300" />
              <div>
                <h1 className="text-xl font-bold">Aircraft Journey</h1>
                <p className="text-xs text-blue-200">211 Lessons • 426 Quizzes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-bold">{completedNodes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Path */}
      <div className="max-w-2xl mx-auto px-4 py-12 relative">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 -translate-x-1/2" />

        {/* Nodes */}
        <div className="relative space-y-6">
          {nodes.map((node, index) => {
            const unlocked = isNodeUnlocked(node.id);
            const completed = isNodeCompleted(node.id);
            const leftPosition = getNodePosition(index);

            if (node.type === 'unit') {
              return (
                <div key={node.id} className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 max-w-md w-full">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{node.emoji}</div>
                      <div className="flex-1">
                        <div className="text-xs text-white/60 mb-1">Unit {node.unitNumber} • {node.level}</div>
                        <div className="text-lg font-bold">{node.name}</div>
                      </div>
                      <Trophy className="w-6 h-6 text-yellow-300" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={node.id}
                className="relative flex items-center"
                style={{ justifyContent: leftPosition === '50%' ? 'center' : leftPosition < '50%' ? 'flex-start' : 'flex-end' }}
              >
                <button
                  onClick={() => handleNodeClick(node)}
                  disabled={!unlocked}
                  className={`group relative transition-all ${unlocked ? 'hover:scale-110' : ''}`}
                >
                  {/* Glow effect */}
                  {unlocked && !completed && (
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                  )}

                  {/* Node Circle */}
                  <div
                    className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                      completed
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                        : unlocked
                        ? `bg-gradient-to-br ${node.color} border-white shadow-lg shadow-blue-500/50`
                        : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    {completed ? (
                      <CheckCircle className="w-10 h-10 text-white" />
                    ) : unlocked ? (
                      node.type === 'lesson' ? (
                        <BookOpen className="w-8 h-8 text-white" />
                      ) : (
                        <Brain className="w-8 h-8 text-white" />
                      )
                    ) : (
                      <Lock className="w-7 h-7 text-gray-400" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <div className={`text-sm font-bold ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {node.type === 'lesson' ? `Lesson ${node.lessonNumber}` : 'Quiz'}
                    </div>
                    {node.type === 'lesson' && (
                      <div className="text-xs text-white/60">{node.emoji}</div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}

          {/* Final Trophy */}
          <div className="relative flex justify-center pt-12">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-8 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/50">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">Journey Complete!</div>
                <div className="text-sm text-white/90 mt-1">Master Pilot Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
