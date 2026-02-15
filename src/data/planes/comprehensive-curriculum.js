// Comprehensive Aircraft Engineering Curriculum
// 6 Sections, 31 Lessons - MIT Quality Content

import { section0Foundations } from './section0-foundations.js';
import { section1Structures } from './section1-structures.js';
import { section2Propulsion } from './section2-propulsion.js';
import { section3Controls } from './section3-controls.js';
import { section4Maintenance } from './section4-maintenance.js';
import { section5Simulation } from './section5-simulation.js';

export const planesCurriculum = {
  title: 'Aircraft Engineering',
  subtitle: 'Complete Aviation Education',
  description: 'Master aircraft design, systems, and operations',
  totalLessons: 31,
  totalHours: 15,
  sections: [
    section0Foundations,
    section1Structures,
    section2Propulsion,
    section3Controls,
    section4Maintenance,
    section5Simulation
  ]
};

export {
  section0Foundations,
  section1Structures,
  section2Propulsion,
  section3Controls,
  section4Maintenance,
  section5Simulation
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
    const mins = parseInt(l.duration) || 25;
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
