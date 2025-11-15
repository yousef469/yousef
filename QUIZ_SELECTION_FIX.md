# Quiz Answer Selection Fix - Green Dot Indicator

## Changes Made

Fixed the quiz answer selection display to show a green dot indicator for the selected answer across all quiz pages.

### Components Updated

1. **src/components/quiz/TrueFalseQuestion.jsx**
   - Added `selectedAnswer` prop support
   - Added fallback logic: `const currentAnswer = selectedAnswer !== undefined ? selectedAnswer : answer;`
   - Updated all references from `answer` to `currentAnswer`

2. **src/pages/BeginnerQuizPage.jsx**
   - Changed `answer={answers[currentQuestion]}` to `selectedAnswer={answers[currentQuestion]}`
   - Applied to both MultipleChoiceQuestion and TrueFalseQuestion

3. **src/pages/PlaneQuizPage.jsx**
   - Changed `answer={answers[currentQuestion]}` to `selectedAnswer={answers[currentQuestion]}`
   - Applied to both MultipleChoiceQuestion and TrueFalseQuestion

### Already Working

- **src/components/quiz/MultipleChoiceQuestion.jsx** - Already had green dot indicator implemented
- **src/pages/PhysicsQuizPage.jsx** - Already using `selectedAnswer` prop correctly
- **src/pages/MathematicsQuizPage.jsx** - Already using `selectedAnswer` prop correctly

## Visual Behavior

When a user selects an answer in a quiz:
- **Multiple Choice**: Green circular indicator with white dot appears next to selected option
- **True/False**: Selected button shows green border and green icon
- The selection persists when navigating between questions using Previous/Next buttons

## Testing

All quiz pages now consistently show the selected answer with proper visual feedback.
