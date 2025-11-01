// MAIN CURRICULUM INDEX
// This file combines all units, lessons, and quizzes
// Easy to import and use throughout the app

import units from './units.js';
import unit1Lessons from './lessons/unit1.js';
import unit1Quizzes from './quizzes/unit1.js';
import unit2Lessons from './lessons/unit2.js';
import unit2Quizzes from './quizzes/unit2.js';
import unit3Lessons from './lessons/unit3.js';
import unit3Quizzes from './quizzes/unit3.js';
import unit4Lessons from './lessons/unit4.js';
import unit4Quizzes from './quizzes/unit4.js';
import unit5Lessons from './lessons/unit5.js';
import unit5Quizzes from './quizzes/unit5.js';
import unit6Lessons from './lessons/unit6.js';
import unit6Quizzes from './quizzes/unit6.js';

// Combine lessons with their quizzes
function combineLessonsWithQuizzes(lessons, quizzes) {
  return lessons.map((lesson, index) => {
    const quiz = quizzes.find(q => q.lessonId === lesson.id);
    return {
      ...lesson,
      level: "Beginner",
      unit: units[`unit${lesson.unitNumber}`].title,
      locked: false, // ALL LESSONS UNLOCKED FOR REVIEW
      quiz: {
        questions: quiz ? quiz.questions : []
      }
    };
  });
}

// Build complete curriculum - ALL 36 LESSONS
export const curriculum = {
  unit1: combineLessonsWithQuizzes(unit1Lessons, unit1Quizzes),
  unit2: combineLessonsWithQuizzes(unit2Lessons, unit2Quizzes),
  unit3: combineLessonsWithQuizzes(unit3Lessons, unit3Quizzes),
  unit4: combineLessonsWithQuizzes(unit4Lessons, unit4Quizzes),
  unit5: combineLessonsWithQuizzes(unit5Lessons, unit5Quizzes),
  unit6: combineLessonsWithQuizzes(unit6Lessons, unit6Quizzes)
};

// Export units metadata
export { units };

// Export individual units for direct access
export { unit1Lessons, unit1Quizzes, unit2Lessons, unit2Quizzes, unit3Lessons, unit3Quizzes, unit4Lessons, unit4Quizzes, unit5Lessons, unit5Quizzes, unit6Lessons, unit6Quizzes };

// Default export
export default curriculum;
