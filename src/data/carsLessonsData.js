// Complete Automotive Engineering Curriculum - All 211 Lessons

import { generateAllAutomotiveLessons } from './generateAutomotiveLessons.js';

// Generate all automotive lessons
const generatedLessons = generateAllAutomotiveLessons();

// Helper function to get unit name
function getUnitName(lessonId) {
  if (lessonId < 36) {
    const units = ['Introduction to Engineering', 'Physics Fundamentals', 'Basic Mathematics for Engineers', 'Introduction to Mechanics', 'Materials & Tools', 'Vehicle Basics'];
    return units[Math.floor(lessonId / 6)];
  } else if (lessonId < 78) {
    const units = ['Statics & Dynamics', 'Strength of Materials', 'Fluid Mechanics I', 'Thermodynamics', 'Electrical Fundamentals', 'Computer-Aided Design (CAD)'];
    return units[Math.floor((lessonId - 36) / 7)];
  } else if (lessonId < 126) {
    const units = ['Vehicle Dynamics', 'Powertrain Systems', 'Vehicle Structures', 'Thermal Systems', 'Control Systems & Sensors', 'Manufacturing & Assembly'];
    return units[Math.floor((lessonId - 78) / 8)];
  } else if (lessonId < 166) {
    const units = ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Automotive Electronics', 'Systems Integration', 'Safety and Certification'];
    return units[Math.floor((lessonId - 126) / 8)];
  } else {
    const units = ['Electric & Hybrid Powertrains', 'Autonomous & AI Systems', 'Advanced Vehicle Design', 'Manufacturing Innovation', 'Capstone / Research Project'];
    return units[Math.floor((lessonId - 166) / 9)];
  }
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
