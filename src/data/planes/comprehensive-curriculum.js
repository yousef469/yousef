// Comprehensive Aircraft Engineering Curriculum
// 10 Sections, 50 Deep Lessons - MIT Quality Content

import { section0Foundations } from './section0-foundations.js';
import { section1Structures } from './section1-structures.js';
import { section2Propulsion } from './section2-propulsion.js';
import { section3Systems } from './section3-systems.js';
import { section4Avionics } from './section4-avionics.js';
import { section5Performance } from './section5-performance.js';
import { section6Aerodynamics } from './section6-aerodynamics.js';
import { section7Future } from './section7-future.js';
import { section8Space } from './section8-space.js';
import { section9History } from './section9-history.js';

export const planesCurriculum = {
  title: 'Aerospace Engineering',
  subtitle: 'Complete Aviation & Space Education',
  description: 'Master aircraft design, systems, operations, and future technologies',
  // Dynamic stats will be calculated by getCurriculumStats, but reasonable defaults:
  totalLessons: 50,
  totalHours: 25,
  sections: [
    section0Foundations,
    section1Structures,
    section2Propulsion,
    section3Systems,
    section4Avionics,
    section5Performance,
    section6Aerodynamics,
    section7Future,
    section8Space,
    section9History
  ]
};

export {
  section0Foundations,
  section1Structures,
  section2Propulsion,
  section3Systems,
  section4Avionics,
  section5Performance,
  section6Aerodynamics,
  section7Future,
  section8Space,
  section9History
};

// Helper function to get all lessons as flat array
export const getAllLessons = () => {
  const lessons = [];
  let lessonIndex = 0;

  planesCurriculum.sections.forEach((section, sectionIndex) => {
    section.units.forEach((unit, unitIndex) => {
      unit.lessons.forEach((lesson) => {
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

export const getSectionById = (sectionId) => {
  return planesCurriculum.sections.find(s => s.id === sectionId);
};

export const getLessonById = (lessonId) => {
  return getAllLessons().find(l => l.id === lessonId || l.fullId === lessonId);
};

export const getCurriculumStats = () => {
  const allLessons = getAllLessons();
  const totalXP = allLessons.reduce((sum, l) => sum + (l.xp || 0), 0);
  const totalMinutes = allLessons.reduce((sum, l) => {
    const mins = parseInt(l.duration) || 30;
    return sum + mins;
  }, 0);

  return {
    totalSections: planesCurriculum.sections.length,
    totalUnits: planesCurriculum.sections.reduce((sum, s) => sum + s.units.length, 0),
    totalLessons: allLessons.length,
    availableLessons: allLessons.length,
    totalXP,
    totalHours: Math.round(totalMinutes / 60),
    completionCertificate: true
  };
};

export default planesCurriculum;
