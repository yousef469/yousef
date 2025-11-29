// Comprehensive Civil Engineering Curriculum
// 5 Sections, 27 Lessons - MIT Quality Content

import { section0Foundations } from './section0-foundations.js';
import { section1Surveying } from './section1-surveying.js';
import { section2Materials } from './section2-materials.js';
import { section3Structural } from './section3-structural.js';
import { section4Water } from './section4-water.js';

export const civilCurriculum = {
  title: 'Civil Engineering',
  subtitle: 'Complete Infrastructure Education',
  description: 'Master civil engineering from surveying to structural design',
  totalLessons: 27,
  totalHours: 12,
  sections: [
    section0Foundations,
    section1Surveying,
    section2Materials,
    section3Structural,
    section4Water
  ]
};

export {
  section0Foundations,
  section1Surveying,
  section2Materials,
  section3Structural,
  section4Water
};

// Helper function to get all lessons as flat array
export const getAllLessons = () => {
  const lessons = [];
  let lessonIndex = 0;
  
  civilCurriculum.sections.forEach((section, sectionIndex) => {
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
  return civilCurriculum.sections.find(s => s.id === sectionId);
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
    totalSections: civilCurriculum.sections.length,
    totalUnits: civilCurriculum.sections.reduce((sum, s) => sum + s.units.length, 0),
    totalLessons: allLessons.length,
    availableLessons: allLessons.length,
    totalXP,
    totalHours: Math.round(totalMinutes / 60),
    completionCertificate: true
  };
};

export default civilCurriculum;
