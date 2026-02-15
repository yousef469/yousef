// Comprehensive Rocket Engineering Curriculum
// 8 Sections, 60 Lessons - No duplicate content
// Each lesson has AI tutor + quiz with XP

import { section1Foundations } from './section1-foundations.js';
import { section2Propulsion } from './section2-propulsion.js';
import { section3Structures } from './section3-structures.js';
import { section4Avionics } from './section4-avionics.js';
import { section5Design } from './section5-design.js';
import { section6Testing } from './section6-testing.js';
import { section7Operations } from './section7-operations.js';
import { section8Capstone } from './section8-capstone.js';

// Complete curriculum structure
export const rocketCurriculum = {
  title: 'Rocket Engineering',
  subtitle: 'Complete Aerospace Education',
  description: 'Master rocket science from math foundations to mission operations',
  totalLessons: 60,
  totalHours: 30,
  sections: [
    section1Foundations,  // Unit 0: Foundations (Math & Physics for Rockets)
    section2Propulsion,   // Unit 1: Propulsion
    section3Structures,   // Unit 2: Structures & Materials
    section4Avionics,     // Unit 3: Avionics & Control
    section5Design,       // Unit 4: Rocket Design
    section6Testing,      // Unit 5: Testing & Safety
    section7Operations,   // Unit 6: Launch Operations
    section8Capstone      // Unit 7: Capstone Projects
  ]
};

// Export individual sections for direct access
export {
  section1Foundations,
  section2Propulsion,
  section3Structures,
  section4Avionics,
  section5Design,
  section6Testing,
  section7Operations,
  section8Capstone
};

// Helper function to get all lessons as flat array
export const getAllLessons = () => {
  const lessons = [];
  let lessonIndex = 0;
  
  rocketCurriculum.sections.forEach((section, sectionIndex) => {
    section.units.forEach((unit, unitIndex) => {
      unit.lessons.forEach((lesson, lessonInUnit) => {
        lessons.push({
          ...lesson,
          sectionId: section.id,
          sectionTitle: section.title,
          sectionIndex,
          unitId: unit.id,
          unitTitle: unit.title,
          unitIndex,
          globalIndex: lessonIndex++,
          fullId: `${section.id}-${unit.id}-${lesson.id}`
        });
      });
    });
  });
  
  return lessons;
};

// Helper to get section by ID
export const getSectionById = (sectionId) => {
  return rocketCurriculum.sections.find(s => s.id === sectionId);
};

// Helper to get lesson by ID
export const getLessonById = (lessonId) => {
  return getAllLessons().find(l => l.id === lessonId || l.fullId === lessonId);
};

// Statistics
export const getCurriculumStats = () => {
  const allLessons = getAllLessons();
  const availableLessons = allLessons.filter(l => !l.comingSoon);
  const totalXP = allLessons.reduce((sum, l) => sum + (l.xp || 0), 0);
  const totalMinutes = allLessons.reduce((sum, l) => {
    const mins = parseInt(l.duration) || 30;
    return sum + mins;
  }, 0);
  
  return {
    totalSections: rocketCurriculum.sections.length,
    totalUnits: rocketCurriculum.sections.reduce((sum, s) => sum + s.units.length, 0),
    totalLessons: allLessons.length,
    availableLessons: availableLessons.length,
    comingSoonLessons: allLessons.length - availableLessons.length,
    totalXP,
    totalHours: Math.round(totalMinutes / 60),
    completionCertificate: true
  };
};

export default rocketCurriculum;
