// Complete Aerospace (Airplane) Engineering Curriculum - 83 Lessons in 10 Units

import curriculum from './curriculum/index.js';
import { generateAllAerospaceLessons } from './generateAerospaceLessons.js';

// Use real curriculum for first 36 beginner lessons
const beginnerLessons = [];
for (let unitNum = 1; unitNum <= 6; unitNum++) {
  const unitLessons = curriculum[`unit${unitNum}`];
  beginnerLessons.push(...unitLessons);
}

// Generate aerospace lessons for all 83 lessons
const generatedAerospaceLessons = generateAllAerospaceLessons();

// Helper function to get unit name
function getUnitName(lessonId) {
  const unitBoundaries = [7, 15, 22, 30, 38, 46, 54, 62, 68, 75, 83];
  const units = [
    'Introduction to Flight',
    'Aerodynamics Basics',
    'Aircraft Structures',
    'Propulsion Systems',
    'Flight Mechanics',
    'Avionics & Flight Control Systems',
    'Aircraft Design & Simulation',
    'Flight Operations & Systems',
    'Aerodynamics of High-Speed Flight',
    'Future of Aerospace'
  ];
  
  for (let i = 0; i < unitBoundaries.length; i++) {
    if (lessonId < unitBoundaries[i]) {
      return units[i];
    }
  }
  return units[units.length - 1];
}

// Format lessons for the lesson page
export const planesLessons = Object.keys(generatedAerospaceLessons).reduce((acc, key) => {
  const lesson = generatedAerospaceLessons[key];
  acc[key] = {
    ...lesson,
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

export default planesLessons;
