// TEST PAGE - Check if curriculum loads
import { useNavigate } from 'react-router-dom';
import beginnerLessons from '../data/beginnerLessonsData';

export default function TestCurriculumPage() {
  const navigate = useNavigate();
  
  console.log('Beginner Lessons:', beginnerLessons);
  console.log('Unit 1:', beginnerLessons.unit1);
  console.log('Unit 1 Length:', beginnerLessons.unit1?.length);
  console.log('First Lesson:', beginnerLessons.unit1?.[0]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button onClick={() => navigate('/')} className="mb-4 px-4 py-2 bg-blue-600 rounded">
        Back Home
      </button>
      
      <h1 className="text-3xl font-bold mb-6">Curriculum Test Page</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Units Loaded:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(Object.keys(beginnerLessons), null, 2)}
          </pre>
        </div>
        
        {Object.entries(beginnerLessons).map(([unitKey, lessons]) => (
          <div key={unitKey} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">{unitKey}: {lessons?.length || 0} lessons</h2>
            {lessons && lessons.length > 0 ? (
              <ul className="space-y-2">
                {lessons.map((lesson, idx) => (
                  <li key={idx} className="text-sm">
                    <span className="font-semibold">Lesson {lesson.lessonNumber}:</span> {lesson.title}
                    <span className="text-gray-400 ml-2">
                      (Locked: {lesson.locked ? 'Yes' : 'No'}, 
                      Sections: {lesson.sections?.length || 0},
                      Quiz: {lesson.quiz?.questions?.length || 0} questions)
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-400">No lessons found!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
