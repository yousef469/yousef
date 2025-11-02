// Complete Rocket Engineering Curriculum - 50 Lessons in 10 Units

import { generateAllRocketLessons } from './generateRocketLessons.js';

// Generate all rocket lessons
const generatedLessons = generateAllRocketLessons();

// Helper function to get unit name
function getUnitName(lessonId) {
  const units = [
    'Introduction to Rocketry',
    'Science Foundations',
    'Rocket Propulsion Basics',
    'Propellants & Combustion',
    'Rocket Structures and Materials',
    'Guidance, Navigation & Control (GNC)',
    'Orbital Mechanics',
    'Rocket Design & Simulation',
    'Avionics & Mission Operations',
    'Advanced Rocketry & Reusability'
  ];
  return units[Math.floor(lessonId / 5)];
}

// Format lessons for the lesson page
export const rocketsLessons = Object.keys(generatedLessons).reduce((acc, key) => {
  const lesson = generatedLessons[key];
  acc[key] = {
    ...lesson,
    level: 'Rocket Engineering',
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
}, {});

export default rocketsLessons;
