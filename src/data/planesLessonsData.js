// Complete Aircraft Engineering Curriculum - All 211 Lessons
// Using real curriculum content for first 36 lessons (Beginner level)
// Using generated content for remaining 175 lessons

import curriculum from './curriculum/index.js';
import { generateAllLessons } from './generateLessons.js';

// Flatten curriculum into array format for game map (36 beginner lessons)
const beginnerLessons = [];
for (let unitNum = 1; unitNum <= 6; unitNum++) {
  const unitLessons = curriculum[`unit${unitNum}`];
  beginnerLessons.push(...unitLessons);
}

// Generate lessons for intermediate through master levels (175 lessons)
const generatedLessons = generateAllLessons();

// Legacy placeholder function (kept for reference)
const generatePlaceholderLessons = () => {
  const placeholders = {};
  
  for (let i = 36; i < 211; i++) {
    const lessonId = i;
    let level, unit, unitNumber, lessonNumber, emoji, quizzesAfter;

    if (lessonId < 78) {
      // Intermediate (36-77) - 42 lessons
      level = 'Intermediate';
      const offset = lessonId - 36;
      unitNumber = Math.floor(offset / 7) + 1;
      lessonNumber = (offset % 7) + 1;
      quizzesAfter = 2;

      const intermediateUnits = [
        { name: 'Statics', emoji: '⚖️' },
        { name: 'Dynamics', emoji: '🔄' },
        { name: 'Strength of Materials', emoji: '💪' },
        { name: 'Fluid Mechanics I', emoji: '🌊' },
        { name: 'Thermodynamics', emoji: '🔥' },
        { name: 'Computer-Aided Design (CAD)', emoji: '💻' }
      ];
      unit = intermediateUnits[unitNumber - 1].name;
      emoji = intermediateUnits[unitNumber - 1].emoji;

    } else if (lessonId < 126) {
      // Advanced (78-125) - 48 lessons
      level = 'Advanced';
      const offset = lessonId - 78;
      unitNumber = Math.floor(offset / 8) + 1;
      lessonNumber = (offset % 8) + 1;
      quizzesAfter = 2;

      const advancedUnits = [
        { name: 'Aerodynamics II', emoji: '🌪️' },
        { name: 'Propulsion Systems', emoji: '🚀' },
        { name: 'Aircraft Structures', emoji: '🏗️' },
        { name: 'Flight Mechanics', emoji: '🛫' },
        { name: 'Avionics & Control Systems', emoji: '📡' },
        { name: 'Manufacturing & Assembly', emoji: '🏭' }
      ];
      unit = advancedUnits[unitNumber - 1].name;
      emoji = advancedUnits[unitNumber - 1].emoji;

    } else if (lessonId < 166) {
      // Expert (126-165) - 40 lessons
      level = 'Expert';
      const offset = lessonId - 126;
      unitNumber = Math.floor(offset / 8) + 1;
      lessonNumber = (offset % 8) + 1;
      quizzesAfter = unitNumber <= 2 ? 3 : 2;

      const expertUnits = [
        { name: 'Finite Element Analysis (FEA)', emoji: '📊' },
        { name: 'Computational Fluid Dynamics (CFD)', emoji: '💻' },
        { name: 'Systems Integration', emoji: '🔗' },
        { name: 'Certification & Safety', emoji: '✅' },
        { name: 'Maintenance Engineering', emoji: '🔧' }
      ];
      unit = expertUnits[unitNumber - 1].name;
      emoji = expertUnits[unitNumber - 1].emoji;

    } else {
      // Master (166-210) - 45 lessons
      level = 'Master';
      const offset = lessonId - 166;
      unitNumber = Math.floor(offset / 9) + 1;
      lessonNumber = (offset % 9) + 1;
      quizzesAfter = [1, 3, 4].includes(unitNumber) ? 3 : 2;

      const masterUnits = [
        { name: 'Advanced Propulsion', emoji: '🚀' },
        { name: 'Flight Control Algorithms', emoji: '🎮' },
        { name: 'Unmanned Aerial Systems (Drones)', emoji: '🛸' },
        { name: 'Spacecraft Design & Orbital Mechanics', emoji: '🌌' },
        { name: 'AI & Sustainability in Aerospace', emoji: '🌱' }
      ];
      unit = masterUnits[unitNumber - 1].name;
      emoji = masterUnits[unitNumber - 1].emoji;
    }

    placeholders[lessonId] = {
      id: lessonId,
      level,
      unit,
      unitNumber,
      lessonNumber,
      title: `${unit} - Part ${lessonNumber}`,
      emoji,
      duration: '10-15 min',
      quizzesAfter,
      content: {
        introduction: `This lesson covers key concepts in ${unit}. Content will be added soon.`,
        sections: [
          {
            title: 'Overview',
            content: 'Detailed lesson content coming soon. This is a placeholder for future curriculum expansion.'
          }
        ],
        keyTakeaways: ['Content coming soon'],
        vocabulary: []
      },
      quiz: {
        type: level.toLowerCase(),
        questions: []
      }
    };
  }
  
  return placeholders;
};

// Combine real beginner lessons with generated content
export const planesLessons = {
  // Real curriculum content (lessons 0-35)
  ...beginnerLessons.reduce((acc, lesson, index) => {
    acc[index] = {
      ...lesson,
      content: {
        introduction: lesson.content.introduction,
        sections: lesson.content.sections,
        keyTakeaways: lesson.content.keyTakeaways,
        vocabulary: lesson.content.vocabulary
      }
    };
    return acc;
  }, {}),
  
  // Generated lessons with full content (lessons 36-210)
  ...Object.keys(generatedLessons).reduce((acc, key) => {
    const lesson = generatedLessons[key];
    acc[key] = {
      ...lesson,
      level: lesson.id < 78 ? 'Intermediate' : lesson.id < 126 ? 'Advanced' : lesson.id < 166 ? 'Expert' : 'Master',
      unit: getUnitName(lesson.id),
      content: {
        introduction: lesson.introduction,
        sections: lesson.sections,
        keyTakeaways: lesson.keyTakeaways,
        vocabulary: lesson.vocabulary
      },
      quiz: {
        questions: []
      }
    };
    return acc;
  }, {})
};

// Helper function to get unit name
function getUnitName(lessonId) {
  if (lessonId < 78) {
    const units = ['Statics', 'Dynamics', 'Strength of Materials', 'Fluid Mechanics I', 'Thermodynamics', 'Computer-Aided Design (CAD)'];
    return units[Math.floor((lessonId - 36) / 7)];
  } else if (lessonId < 126) {
    const units = ['Aerodynamics II', 'Propulsion Systems', 'Aircraft Structures', 'Flight Mechanics', 'Avionics & Control Systems', 'Manufacturing & Assembly'];
    return units[Math.floor((lessonId - 78) / 8)];
  } else if (lessonId < 166) {
    const units = ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Systems Integration', 'Certification & Safety', 'Maintenance Engineering'];
    return units[Math.floor((lessonId - 126) / 8)];
  } else {
    const units = ['Advanced Propulsion', 'Flight Control Algorithms', 'Unmanned Aerial Systems (Drones)', 'Spacecraft Design & Orbital Mechanics', 'AI & Sustainability in Aerospace'];
    return units[Math.floor((lessonId - 166) / 9)];
  }
}

export default planesLessons;
