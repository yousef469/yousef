# 📊 Mixpanel Usage Examples

## How to Add Tracking to Your Components

### Example 1: Track Lesson Completion

```javascript
// In RocketLessonPage.jsx
import { trackLessonStart, trackLessonComplete } from '../services/mixpanel';

const RocketLessonPage = () => {
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    // Track when lesson starts
    trackLessonStart(lessonId, lessonName, 'rockets');
    setStartTime(Date.now());
  }, []);
  
  const handleComplete = (score) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    trackLessonComplete(lessonId, lessonName, 'rockets', timeSpent, score);
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 2: Track 3D Model Interactions

```javascript
// In ThreeJSViewer.jsx
import { trackModelView, trackModelInteraction } from '../services/mixpanel';

const ThreeJSViewer = ({ modelId, modelName, category }) => {
  useEffect(() => {
    // Track when model is viewed
    trackModelView(modelId, modelName, category);
  }, [modelId]);
  
  const handleRotate = () => {
    trackModelInteraction(modelId, modelName, 'rotate');
  };
  
  const handleZoom = () => {
    trackModelInteraction(modelId, modelName, 'zoom');
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 3: Track AI Questions

```javascript
// In AITutor.jsx
import { trackAIQuestion, trackAIResponse } from '../services/mixpanel';

const AITutor = () => {
  const handleAskQuestion = async (question) => {
    const startTime = Date.now();
    
    // Track question
    trackAIQuestion(question, 'general', false);
    
    // Get AI response
    const response = await askGemini(question);
    
    // Track response time
    const responseTime = Date.now() - startTime;
    trackAIResponse(question, responseTime, false);
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 4: Track Game Completion

```javascript
// In QuizGame.jsx
import { trackGameStart, trackGameComplete } from '../services/mixpanel';

const QuizGame = () => {
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    trackGameStart('quiz', 'rockets');
    setStartTime(Date.now());
  }, []);
  
  const handleGameEnd = (score) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    trackGameComplete('quiz', 'rockets', score, timeSpent);
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 5: Track Social Sharing

```javascript
// In SocialShare.jsx
import { trackSocialShare } from '../services/mixpanel';

const SocialShare = () => {
  const handleTwitterShare = () => {
    trackSocialShare('twitter', 'achievement');
    // Open Twitter share dialog
  };
  
  const handleLinkedInShare = () => {
    trackSocialShare('linkedin', 'achievement');
    // Open LinkedIn share dialog
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 6: Track Subscription Upgrades

```javascript
// In PricingTiers.jsx
import { trackSubscriptionView, trackSubscriptionUpgrade } from '../services/mixpanel';

const PricingTiers = () => {
  useEffect(() => {
    trackSubscriptionView('pricing_page');
  }, []);
  
  const handleUpgrade = (tier, price) => {
    trackSubscriptionUpgrade('free', tier, price);
    // Process payment
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 7: Track Feature Usage

```javascript
// In any component
import { trackFeatureUsed } from '../services/mixpanel';

const MyComponent = () => {
  const handleFeatureClick = () => {
    trackFeatureUsed('model_comparison', {
      models_compared: 2,
      category: 'rockets'
    });
  };
  
  return (
    // Your component JSX
  );
};
```

### Example 8: Track Errors

```javascript
// In error boundary or catch blocks
import { trackError } from '../services/mixpanel';

try {
  // Some code that might fail
} catch (error) {
  trackError('api_error', error.message, {
    endpoint: '/api/lessons',
    userId: user?.id
  });
}
```

### Example 9: Track Page Views

```javascript
// In App.jsx or route components
import { trackPageView } from '../services/mixpanel';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return (
    // Your app JSX
  );
};
```

### Example 10: Track Session Duration

```javascript
// In App.jsx
import { trackSessionStart, trackSessionEnd } from '../services/mixpanel';

const App = () => {
  const [sessionStart, setSessionStart] = useState(null);
  
  useEffect(() => {
    // Track session start
    trackSessionStart();
    setSessionStart(Date.now());
    
    // Track session end on unmount
    return () => {
      const duration = Math.floor((Date.now() - sessionStart) / 1000);
      trackSessionEnd(duration);
    };
  }, []);
  
  return (
    // Your app JSX
  );
};
```

## Quick Reference

### Import Statement
```javascript
import {
  trackPageView,
  trackLessonComplete,
  trackModelView,
  trackAIQuestion,
  trackGameComplete,
  trackSocialShare,
  // ... any other tracking functions
} from '../services/mixpanel';
```

### Common Patterns

#### Track on Mount
```javascript
useEffect(() => {
  trackFeatureUsed('feature_name');
}, []);
```

#### Track on Click
```javascript
<button onClick={() => trackFeatureUsed('button_click')}>
  Click Me
</button>
```

#### Track with Timer
```javascript
const [startTime, setStartTime] = useState(Date.now());

const handleComplete = () => {
  const duration = Math.floor((Date.now() - startTime) / 1000);
  trackLessonComplete(id, name, category, duration, score);
};
```

#### Track with Conditions
```javascript
if (score > 90) {
  trackAchievementUnlocked('high_score', 'Quiz Master');
}
```

## Best Practices

1. **Track Early** - Add tracking when building features, not after
2. **Be Specific** - Use descriptive event names
3. **Add Context** - Include relevant properties
4. **Don't Over-Track** - Only track meaningful events
5. **Test Locally** - Verify events in Mixpanel Live View
6. **Document Events** - Keep a list of all tracked events

## Events Already Tracked

✅ Authentication (Sign Up, Sign In, Sign Out)
✅ Page Views (automatic)
✅ User Identification (automatic)

## Events You Should Add

### High Priority:
- [ ] Lesson interactions in RocketLessonPage.jsx
- [ ] Model views in ModelViewerPage.jsx
- [ ] AI questions in AITutor.jsx
- [ ] Game completions in game pages
- [ ] Social shares in SocialShare.jsx

### Medium Priority:
- [ ] Calculator usage
- [ ] Search queries
- [ ] Bookmark additions
- [ ] Note creations
- [ ] Model uploads

### Low Priority:
- [ ] Button clicks
- [ ] Scroll depth
- [ ] Mouse movements
- [ ] Time on page

---

**Start tracking today and make data-driven decisions! 📊**
