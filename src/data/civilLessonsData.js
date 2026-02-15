// Complete Civil Engineering Curriculum
// MIT-Quality Content with Real Engineering

import { civilCurriculum, getAllLessons } from './civil/comprehensive-curriculum.js';

// Get all lessons from the comprehensive curriculum
const allLessonsArray = getAllLessons();

// Convert to object format for backward compatibility
const allLessons = {};

allLessonsArray.forEach((lesson, index) => {
  allLessons[index] = {
    id: index,
    lessonId: lesson.id,
    fullId: lesson.fullId,
    title: lesson.title,
    unit: lesson.unitTitle,
    section: lesson.sectionTitle,
    duration: lesson.duration || '25 min',
    xp: lesson.xp || 150,
    level: lesson.sectionIndex < 2 ? 'Beginner' : lesson.sectionIndex < 4 ? 'Intermediate' : 'Advanced',
    introduction: lesson.introduction || lesson.description,
    content: {
      introduction: lesson.introduction || lesson.description,
      sections: lesson.sections || [],
      keyTakeaways: lesson.keyTakeaways || [],
      vocabulary: lesson.vocabulary || []
    },
    quiz: lesson.quiz || { questions: [] }
  };
});

export const civilLessons = allLessons;

// Re-export curriculum utilities
export { civilCurriculum, getAllLessons };
export { getSectionById, getLessonById, getCurriculumStats } from './civil/comprehensive-curriculum.js';

export default civilLessons;
