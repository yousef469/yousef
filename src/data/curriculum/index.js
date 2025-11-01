// MAIN CURRICULUM INDEX
// This file combines all units, lessons, and quizzes
// Easy to import and use throughout the app

import units from './units.js';
import unit1Lessons from './lessons/unit1.js';
import unit1Quizzes from './quizzes/unit1.js';

// Combine lessons with their quizzes
function combineLessonsWithQuizzes(lessons, quizzes) {
  return lessons.map((lesson, index) => {
    const quiz = quizzes.find(q => q.lessonId === lesson.id);
    return {
      ...lesson,
      level: "Beginner",
      unit: units[`unit${lesson.unitNumber}`].title,
      locked: index === 0 ? false : true, // First lesson unlocked
      quiz: {
        questions: quiz ? quiz.questions : []
      }
    };
  });
}

// Build complete curriculum
export const curriculum = {
  unit1: combineLessonsWithQuizzes(unit1Lessons, unit1Quizzes),
  unit2: [], // To be added
  unit3: [], // To be added
  unit4: [], // To be added (from planesLessonsData)
  unit5: [], // To be added
  unit6: []  // To be added
};

// Export units metadata
export { units };

// Export individual units for direct access
export { unit1Lessons, unit1Quizzes };

// Default export
export default curriculum;
