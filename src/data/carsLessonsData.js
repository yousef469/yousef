// Complete Automotive Engineering Curriculum - All 211 Lessons

import { generateAllAutomotiveLessons } from './generateAutomotiveLessons.js';

// Generate all automotive lessons
const generatedLessons = generateAllAutomotiveLessons();

// Helper function to get unit name
function getUnitName(lessonId) {
  const unitBoundaries = [7, 15, 23, 30, 38, 47, 54, 62, 70, 76];
  const units = [
    'Fundamentals of Cars',
    'Vehicle Mechanics',
    'Vehicle Dynamics',
    'Automotive Materials & Design',
    'Electrical and Electronic Systems',
    'Powertrain & Energy Systems',
    'Control Systems & Automation',
    'Manufacturing & Design Process',
    'Maintenance & Diagnostics',
    'Future of Automotive Engineering'
  ];
  
  for (let i = 0; i < unitBoundaries.length; i++) {
    if (lessonId < unitBoundaries[i]) {
      return units[i];
    }
  }
  return units[units.length - 1];
}

// Format lessons for the lesson page
export const carsLessons = Object.keys(generatedLessons).reduce((acc, key) => {
  const lesson = generatedLessons[key];
  acc[key] = {
    ...lesson,
    level: lesson.id < 36 ? 'Beginner' : lesson.id < 78 ? 'Intermediate' : lesson.id < 126 ? 'Advanced' : lesson.id < 166 ? 'Expert' : 'Master',
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

export default carsLessons;
