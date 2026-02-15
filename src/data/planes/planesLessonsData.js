// Complete Aircraft Engineering Curriculum
// MIT-Quality Content: 6 Sections, 31 Lessons

import { planesCurriculum, getAllLessons, getCurriculumStats } from './comprehensive-curriculum.js';

// Convert curriculum to lessons object format for compatibility
export const planesLessons = {};

// Process all lessons from the comprehensive curriculum
const allLessons = getAllLessons();

allLessons.forEach((lesson, index) => {
  planesLessons[lesson.id] = {
    id: lesson.id,
    title: lesson.title,
    duration: lesson.duration,
    xp: lesson.xp,
    description: lesson.description,
    introduction: lesson.introduction,
    sectionId: lesson.sectionId,
    sectionTitle: lesson.sectionTitle,
    unitId: lesson.unitId,
    unitTitle: lesson.unitTitle,
    emoji: getEmojiForSection(lesson.sectionId),
    level: getLevelForSection(lesson.sectionIndex),
    unitNumber: lesson.unitIndex,
    lessonNumber: index + 1,
    sections: lesson.sections,
    keyTakeaways: lesson.keyTakeaways,
    quiz: lesson.quiz
  };
});

function getEmojiForSection(sectionId) {
  const emojis = {
    'foundations': '🎓',
    'structures': '🏗️',
    'propulsion': '🔥',
    'controls': '🎛️',
    'maintenance': '🔧',
    'simulation': '🛫'
  };
  return emojis[sectionId] || '✈️';
}

function getLevelForSection(sectionIndex) {
  if (sectionIndex <= 1) return 'Beginner';
  if (sectionIndex <= 3) return 'Intermediate';
  return 'Advanced';
}

// Export curriculum structure for the game map
export const planesSections = planesCurriculum.sections.map((section, index) => ({
  id: section.id,
  title: section.title,
  description: section.description,
  icon: section.icon,
  color: section.color,
  units: section.units.map(unit => ({
    id: unit.id,
    title: unit.title,
    description: unit.description,
    lessons: unit.lessons.map(l => l.id)
  })),
  totalLessons: section.units.reduce((sum, u) => sum + u.lessons.length, 0),
  level: getLevelForSection(index)
}));

export const curriculumStats = getCurriculumStats();

export default planesLessons;
