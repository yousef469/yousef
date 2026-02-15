// Complete Rocket Engineering Curriculum
// MIT-Quality Content: 8 Sections, ~100 Lessons
// Career-Ready Aerospace Engineering Education

import { rocketCurriculum, getAllLessons, getCurriculumStats } from './rockets/comprehensive-curriculum.js';

// Convert curriculum to lessons object format for compatibility
export const rocketsLessons = {};

// Process all lessons from the comprehensive curriculum
const allLessons = getAllLessons();

allLessons.forEach((lesson, index) => {
  // Skip coming soon lessons that don't have full content
  if (lesson.comingSoon) {
    rocketsLessons[lesson.id] = {
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      xp: lesson.xp,
      description: lesson.description || `Coming soon: ${lesson.title}`,
      comingSoon: true,
      sectionId: lesson.sectionId,
      sectionTitle: lesson.sectionTitle,
      unitId: lesson.unitId,
      unitTitle: lesson.unitTitle,
      emoji: getEmojiForSection(lesson.sectionId),
      level: getLevelForSection(lesson.sectionIndex),
      unitNumber: lesson.unitIndex,
      lessonNumber: index + 1
    };
    return;
  }

  // Full lesson with content
  rocketsLessons[lesson.id] = {
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
    content: {
      introduction: lesson.introduction,
      sections: lesson.sections,
      keyTakeaways: lesson.keyTakeaways,
      vocabulary: lesson.vocabulary
    },
    quiz: lesson.quiz
  };
});

// Helper functions
function getEmojiForSection(sectionId) {
  const emojis = {
    'foundations': '🧮',
    'propulsion': '🔥',
    'structures': '🏗️',
    'avionics': '🧠',
    'rocket-design': '📐',
    'testing-safety': '🔬',
    'launch-operations': '🚀',
    'capstone': '🏆'
  };
  return emojis[sectionId] || '🚀';
}

function getLevelForSection(sectionIndex) {
  if (sectionIndex <= 1) return 'Beginner';
  if (sectionIndex <= 3) return 'Intermediate';
  if (sectionIndex <= 5) return 'Advanced';
  return 'Expert';
}

// Export curriculum structure for the game map
export const rocketSections = rocketCurriculum.sections.map((section, index) => ({
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

// Export stats
export const curriculumStats = getCurriculumStats();

// Legacy support - export as default
export default rocketsLessons;
