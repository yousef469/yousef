# 📚 Curriculum Structure

## Organization

All curriculum content is organized in this folder for easy maintenance:

```
curriculum/
├── index.js              # Main file - combines everything
├── units.js              # Unit metadata (titles, descriptions, colors)
├── lessons/              # Lesson content by unit
│   ├── unit1.js         # Unit 1: Introduction to Engineering
│   ├── unit2.js         # Unit 2: Physics Basics
│   ├── unit3.js         # Unit 3: Mathematics
│   ├── unit4.js         # Unit 4: Basics of Flight
│   ├── unit5.js         # Unit 5: Aircraft Components
│   └── unit6.js         # Unit 6: Materials & Tools
└── quizzes/              # Quiz questions by unit
    ├── unit1.js         # Unit 1 quizzes
    ├── unit2.js         # Unit 2 quizzes
    ├── unit3.js         # Unit 3 quizzes
    ├── unit4.js         # Unit 4 quizzes
    ├── unit5.js         # Unit 5 quizzes
    └── unit6.js         # Unit 6 quizzes
```

## How to Use

### Import Everything
```javascript
import curriculum from './curriculum/index.js';
// Access: curriculum.unit1, curriculum.unit2, etc.
```

### Import Specific Unit
```javascript
import { unit1Lessons } from './curriculum/lessons/unit1.js';
import { unit1Quizzes } from './curriculum/quizzes/unit1.js';
```

### Import Unit Metadata
```javascript
import { units } from './curriculum/units.js';
// Access: units.unit1.title, units.unit1.description, etc.
```

## Adding New Content

### To Add a New Lesson:
1. Open `lessons/unitX.js`
2. Add lesson object to array
3. Follow existing format

### To Add Quiz Questions:
1. Open `quizzes/unitX.js`
2. Add quiz object with lessonId
3. Add questions array

### To Modify Unit Info:
1. Open `units.js`
2. Update unit metadata
3. Changes reflect everywhere

## Benefits

✅ **Easy to Find**: All content in one organized place
✅ **Easy to Edit**: Each unit in separate file
✅ **Easy to Delete**: Remove entire unit file if needed
✅ **Easy to Add**: Follow existing pattern
✅ **No Duplication**: Lessons and quizzes separated
✅ **Clean Imports**: One import gets everything

## File Naming Convention

- `unitX.js` where X is the unit number (1-6)
- Lowercase, no spaces
- Consistent across lessons and quizzes folders

## Content Structure

### Lesson Object
```javascript
{
  id: number,              // Unique lesson ID
  title: string,           // Lesson title
  unitNumber: number,      // Which unit (1-6)
  lessonNumber: number,    // Lesson number in unit
  duration: string,        // e.g., "15 min"
  emoji: string,           // Display emoji
  introduction: string,    // Lesson intro
  sections: [...],         // Content sections
  keyTakeaways: [...],     // Main points
  vocabulary: [...]        // Terms and definitions
}
```

### Quiz Object
```javascript
{
  lessonId: number,        // Matches lesson.id
  questions: [             // Array of questions
    {
      type: string,        // "multiple-choice" or "true-false"
      question: string,    // Question text
      options: [...],      // For multiple-choice
      correctAnswer: any,  // Correct answer
      explanation: string, // Why it's correct
      points: number       // XP points (usually 10)
    }
  ]
}
```

## Maintenance Tips

1. **Keep lessons and quizzes in sync**: Same lessonId
2. **Test after changes**: Run app to verify
3. **Use consistent formatting**: Follow existing style
4. **Add comments**: Explain complex content
5. **Version control**: Commit after each unit

## Future Expansion

To add Level 2 (Intermediate):
1. Create `intermediate/` folder
2. Copy this structure
3. Update imports in main app

To add new question types:
1. Add to quiz components
2. Update quiz rendering logic
3. Document in this README
