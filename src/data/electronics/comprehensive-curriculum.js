// Comprehensive Electronics & Robotics Curriculum
// 5 Sections, 28 Lessons - MIT Quality Content

import { section0Foundations } from './section0-foundations.js';
import { section1Digital } from './section1-digital.js';
import { section2Microcontrollers } from './section2-microcontrollers.js';
import { section3Sensors } from './section3-sensors.js';
import { section4Communication } from './section4-communication.js';

export const electronicsCurriculum = {
  title: 'Electronics & Robotics',
  subtitle: 'Complete Electronics Education',
  description: 'Master electronics from fundamentals to advanced communication systems',
  totalLessons: 28,
  totalHours: 12,
  sections: [
    section0Foundations,
    section1Digital,
    section2Microcontrollers,
    section3Sensors,
    section4Communication
  ]
};

export {
  section0Foundations,
  section1Digital,
  section2Microcontrollers,
  section3Sensors,
  section4Communication
};

// Helper function to get all lessons as flat array
export const getAllLessons = () => {
  const lessons = [];
  let lessonIndex = 0;
  
  electronicsCurriculum.sections.forEach((section, sectionIndex) => {
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
  return electronicsCurriculum.sections.find(s => s.id === sectionId);
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
    totalSections: electronicsCurriculum.sections.length,
    totalUnits: electronicsCurriculum.sections.reduce((sum, s) => sum + s.units.length, 0),
    totalLessons: allLessons.length,
    availableLessons: allLessons.length,
    totalXP,
    totalHours: Math.round(totalMinutes / 60),
    completionCertificate: true
  };
};

export default electronicsCurriculum;
