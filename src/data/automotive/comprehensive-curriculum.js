// Comprehensive Automotive Engineering Curriculum
// 5 Sections, 27 Lessons - MIT Quality Content

import { section0Foundations } from './section0-foundations.js';
import { section1Powertrain } from './section1-powertrain.js';
import { section2Dynamics } from './section2-dynamics.js';
import { section3Electronics } from './section3-electronics.js';
import { section4Safety } from './section4-safety.js';

export const automotiveCurriculum = {
  title: 'Automotive Engineering',
  subtitle: 'Complete Vehicle Engineering Education',
  description: 'Master vehicle systems from engines to safety',
  totalLessons: 27,
  totalHours: 12,
  sections: [
    section0Foundations,
    section1Powertrain,
    section2Dynamics,
    section3Electronics,
    section4Safety
  ]
};

export {
  section0Foundations,
  section1Powertrain,
  section2Dynamics,
  section3Electronics,
  section4Safety
};

// Helper function to get all lessons as flat array
export const getAllLessons = () => {
  const lessons = [];
  let lessonIndex = 0;
  
  automotiveCurriculum.sections.forEach((section, sectionIndex) => {
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
  return automotiveCurriculum.sections.find(s => s.id === sectionId);
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
    totalSections: automotiveCurriculum.sections.length,
    totalUnits: automotiveCurriculum.sections.reduce((sum, s) => sum + s.units.length, 0),
    totalLessons: allLessons.length,
    availableLessons: allLessons.length,
    totalXP,
    totalHours: Math.round(totalMinutes / 60),
    completionCertificate: true
  };
};

export default automotiveCurriculum;
