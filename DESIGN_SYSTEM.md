# Engineerium Design System

## Typography

### Fonts
- **Body Text**: `Inter` (sans-serif) - Clean, modern, readable
- **Technical Data**: `JetBrains Mono` (monospace) - For numbers, calculations, code

### Usage
```jsx
// Regular text
<p className="font-sans">This is body text</p>

// Technical data (calculators, measurements, code)
<span className="font-mono">Speed: 299.5 m/s</span>
<div className="font-technical">Orbital Period: 5,400s</div>
```

## Colors

### Primary Palette
- **Primary (Cyan)**: `#00D9FF` - Main brand color, CTAs, links
- **Secondary (Green)**: `#00FF88` - Success states, positive feedback
- **Accent (Orange)**: `#FF6B35` - Highlights, warnings

### Status Colors
- **Success**: `text-success` or `bg-success` - Green (#00FF88)
- **Warning**: `text-warning` or `bg-warning` - Yellow (#FFC107)
- **Danger**: `text-danger` or `bg-danger` - Red (#FF3B30)
- **Info**: `text-info` or `bg-info` - Cyan (#00D9FF)

### Text Colors
- **Primary Text**: `text-white` - Main content
- **Secondary Text**: `text-text-secondary` - Subtitles, descriptions
- **Muted Text**: `text-text-muted` - Improved contrast (#94A3B8)

### Usage Examples
```jsx
// Success message
<div className="text-success">✓ Calculation correct!</div>

// Warning
<div className="text-warning">⚠ Fuel running low</div>

// Error
<div className="text-danger">✗ Rocket crashed!</div>

// Info
<div className="text-info">ℹ Orbital velocity achieved</div>
```

## Backgrounds

### Grid Pattern (Engineering Vibe)
The body already has a subtle grid pattern. For sections without it:
```jsx
<div className="bg-background">
  {/* Grid is automatically applied to body */}
</div>
```

### Solid Backgrounds (Lesson Content)
```jsx
// Use for lesson text panels - solid, readable
<div className="lesson-panel p-6 rounded-lg">
  <h2>Lesson Title</h2>
  <p>Long form content that needs to be easily readable...</p>
</div>
```

### Glassmorphism (Floating UI)
```jsx
// For floating toolbars, AI chat, overlays
<div className="glass rounded-xl p-4">
  <p>This floats over 3D models</p>
</div>

// Lighter version
<div className="glass-light rounded-xl p-4">
  <p>Subtle glass effect</p>
</div>
```

### Engineering Cards
```jsx
// For feature cards, stat boxes
<div className="engineering-card rounded-lg p-6">
  <h3>Feature Title</h3>
  <p>Description</p>
</div>
```

## Glow Effects

### ⚠️ Use Sparingly!
Only apply glow to:
1. 3D models
2. Primary CTA buttons
3. Hero titles

### Classes
```jsx
// Primary glow (cyan)
<button className="glow-primary bg-primary text-black px-6 py-3 rounded-lg">
  Start Learning
</button>

// Secondary glow (green)
<div className="glow-secondary">
  {/* 3D Model */}
</div>

// Accent glow (orange)
<button className="glow-accent">
  Premium Feature
</button>

// Hero title glow
<h1 className="hero-title-glow text-6xl font-bold">
  Engineerium
</h1>
```

### ❌ Don't Use Glow On
- Regular text
- Navigation items
- List items
- Form inputs
- Cards (unless it's a special feature)

## Component Examples

### Calculator Display
```jsx
<div className="engineering-card p-6">
  <h3 className="text-xl font-semibold mb-4">Rocket Equation</h3>
  <div className="font-mono text-2xl text-primary">
    Δv = 2,450 m/s
  </div>
  <div className="font-mono text-sm text-text-muted mt-2">
    Mass Ratio: 3.5
  </div>
</div>
```

### Status Indicator
```jsx
<div className="flex items-center gap-2">
  <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
  <span className="font-mono text-success">System Nominal</span>
</div>

<div className="flex items-center gap-2">
  <div className="w-3 h-3 rounded-full bg-warning animate-pulse"></div>
  <span className="font-mono text-warning">Warning: Low Fuel</span>
</div>

<div className="flex items-center gap-2">
  <div className="w-3 h-3 rounded-full bg-danger animate-pulse"></div>
  <span className="font-mono text-danger">Critical Error</span>
</div>
```

### Floating AI Chat
```jsx
<div className="glass rounded-2xl p-4 shadow-2xl">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
      <Bot className="w-6 h-6 text-primary" />
    </div>
    <span className="font-semibold">AI Assistant</span>
  </div>
  <div className="space-y-3">
    {/* Chat messages */}
  </div>
</div>
```

### Lesson Content Panel
```jsx
<div className="lesson-panel rounded-xl p-8">
  <h2 className="text-3xl font-bold mb-4">Newton's Laws of Motion</h2>
  <p className="text-text-secondary leading-relaxed mb-6">
    Newton's first law states that an object at rest stays at rest...
  </p>
  <div className="engineering-card p-4 mb-6">
    <h3 className="font-mono text-lg text-primary mb-2">Formula</h3>
    <p className="font-mono text-2xl">F = ma</p>
  </div>
</div>
```

### Primary CTA Button
```jsx
<button className="glow-primary bg-primary hover:bg-primary-light text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
  Start Your Journey
</button>
```

### Secondary Button (No Glow)
```jsx
<button className="bg-background-light hover:bg-background border border-primary/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
  Learn More
</button>
```

## Accessibility

### Text Contrast
- All text colors have been tested for WCAG AA compliance
- `text-text-muted` updated to `#94A3B8` for better contrast
- Always use solid backgrounds for long-form content

### Focus States
```jsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
  Accessible Button
</button>
```

## Best Practices

### ✅ Do
- Use `font-mono` for all numbers, calculations, and technical data
- Use `font-sans` for body text and descriptions
- Apply glassmorphism to floating UI elements over 3D models
- Use solid backgrounds for lesson content
- Limit glow effects to CTAs and 3D models
- Use status colors for feedback (success, warning, danger)

### ❌ Don't
- Don't make lesson text panels transparent
- Don't add glow to every element
- Don't use monospace for long paragraphs
- Don't use low-contrast text on dark backgrounds
- Don't overuse animations

## Migration Guide

### Update Existing Components

1. **Replace generic text with proper fonts:**
```jsx
// Before
<span>Speed: 299.5 m/s</span>

// After
<span className="font-mono">Speed: 299.5 m/s</span>
```

2. **Update status messages:**
```jsx
// Before
<div className="text-green-500">Success!</div>

// After
<div className="text-success">✓ Success!</div>
```

3. **Add glassmorphism to floating UI:**
```jsx
// Before
<div className="bg-background/80 backdrop-blur-md">

// After
<div className="glass">
```

4. **Remove excessive glows:**
```jsx
// Before
<div className="shadow-[0_0_30px_rgba(0,217,255,0.5)]">

// After - Only if it's a primary CTA or 3D model
<div className="glow-primary">
```
