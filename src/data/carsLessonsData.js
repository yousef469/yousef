// Complete Automotive Engineering Curriculum - All 211 Lessons

import { generateAllAutomotiveLessons } from './generateAutomotiveLessons.js';

// Generate all automotive lessons
const generatedLessons = generateAllAutomotiveLessons();

// Helper function to get unit name
function getUnitName(lessonId) {
  if (lessonId < 36) {
    const units = ['Intro to Mechanics', 'Vehicle Systems', 'Basic Physics', 'Simple Circuits', 'Materials & Tools', 'Vehicle Maintenance'];
    return units[Math.floor(lessonId / 6)];
  } else if (lessonId < 78) {
    const units = ['Thermodynamics', 'Internal Combustion Engines', 'Vehicle Dynamics', 'Fluid Mechanics', 'Design Principles', 'CAD for Automotive'];
    return units[Math.floor((lessonId - 36) / 7)];
  } else if (lessonId < 126) {
    const units = ['Hybrid & Electric Vehicles', 'Powertrain Systems', 'Vehicle Structures', 'Suspension & Braking', 'Control Systems', 'Automotive Aerodynamics'];
    return units[Math.floor((lessonId - 78) / 8)];
  } else if (lessonId < 166) {
    const units = ['Autonomous Driving', 'FEA for Automotive', 'Advanced Manufacturing', 'Diagnostics & Safety', 'Performance Tuning'];
    return units[Math.floor((lessonId - 126) / 8)];
  } else {
    const units = ['Smart Mobility', 'Sustainable Design', 'AI in Automotive', 'Simulation-Based Design', 'Future Technologies'];
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
