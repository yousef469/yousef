# 📱 AeroAI 3D - React Native Mobile App Guide

## Overview
This guide will help you create a React Native mobile app version of AeroAI 3D for iOS and Android.

## Prerequisites
```bash
# Install Node.js (v18+)
# Install React Native CLI
npm install -g react-native-cli

# For iOS (Mac only)
# Install Xcode from App Store
# Install CocoaPods
sudo gem install cocoapods

# For Android
# Install Android Studio
# Set up Android SDK
```

## Project Setup

### 1. Create React Native Project
```bash
npx react-native init AeroAI3DMobile --template react-native-template-typescript
cd AeroAI3DMobile
```

### 2. Install Dependencies
```bash
# Core dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated

# 3D Graphics
npm install react-native-webview
npm install @react-three/fiber @react-three/drei three

# UI Components
npm install react-native-vector-icons
npm install react-native-linear-gradient
npm install react-native-svg

# Authentication & Backend
npm install @supabase/supabase-js
npm install @react-native-async-storage/async-storage

# AI Integration
npm install @google/generative-ai

# Additional Features
npm install react-native-voice
npm install react-native-share
npm install react-native-fs
npm install react-native-pdf
```

### 3. iOS Setup (Mac only)
```bash
cd ios
pod install
cd ..
```

## Project Structure
```
AeroAI3DMobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── ModelViewerScreen.tsx
│   │   ├── LessonsScreen.tsx
│   │   ├── GamesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/
│   │   ├── ModelViewer3D.tsx
│   │   ├── AIChat.tsx
│   │   ├── ProgressCard.tsx
│   │   ├── LessonCard.tsx
│   │   └── NavigationBar.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── services/
│   │   ├── supabase.ts
│   │   ├── gemini.ts
│   │   └── storage.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useModels.ts
│   │   └── useProgress.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   └── types/
│       └── index.ts
├── android/
├── ios/
└── App.tsx
```

## Key Components

### 1. App.tsx (Main Entry)
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
```

### 2. HomeScreen.tsx
```typescript
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.header}
      >
        <Text style={styles.title}>AeroAI 3D</Text>
        <Text style={styles.subtitle}>Interactive Engineering Education</Text>
      </LinearGradient>

      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Models')}
        >
          <Icon name="rocket" size={40} color="#06b6d4" />
          <Text style={styles.cardTitle}>3D Models</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Lessons')}
        >
          <Icon name="book" size={40} color="#3b82f6" />
          <Text style={styles.cardTitle}>Lessons</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Games')}
        >
          <Icon name="game-controller" size={40} color="#8b5cf6" />
          <Text style={styles.cardTitle}>Games</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Icon name="stats-chart" size={40} color="#10b981" />
          <Text style={styles.cardTitle}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  header: {
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#1f2937',
    borderRadius: 16,
    margin: '1%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});

export default HomeScreen;
```

### 3. ModelViewer3D.tsx
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ModelViewer3D = ({ modelUrl }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
        <style>
          body { margin: 0; overflow: hidden; }
          canvas { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <script>
          // Three.js scene setup
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ antialias: true });
          
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(renderer.domElement);
          
          // Load model
          const loader = new THREE.GLTFLoader();
          loader.load('${modelUrl}', (gltf) => {
            scene.add(gltf.scene);
          });
          
          camera.position.z = 5;
          
          function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          }
          animate();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default ModelViewer3D;
```

### 4. Navigation Setup
```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ModelViewerScreen from '../screens/ModelViewerScreen';
import LessonsScreen from '../screens/LessonsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Models" component={ModelViewerScreen} />
      <Stack.Screen name="Lessons" component={LessonsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
```

## Running the App

### iOS
```bash
npx react-native run-ios
# Or for specific device
npx react-native run-ios --device "iPhone 14 Pro"
```

### Android
```bash
npx react-native run-android
# Or for specific device
adb devices
npx react-native run-android --deviceId=DEVICE_ID
```

## Building for Production

### iOS
```bash
cd ios
# Update version in Xcode
# Archive and upload to App Store Connect
```

### Android
```bash
cd android
./gradlew assembleRelease
# APK will be in android/app/build/outputs/apk/release/
```

## Key Features to Implement

### 1. Offline Mode
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

// Cache models
const cacheModel = async (modelUrl: string) => {
  const localPath = `${RNFS.DocumentDirectoryPath}/models/${modelUrl.split('/').pop()}`;
  await RNFS.downloadFile({
    fromUrl: modelUrl,
    toFile: localPath,
  }).promise;
  await AsyncStorage.setItem(`model_${modelUrl}`, localPath);
};
```

### 2. Push Notifications
```bash
npm install @react-native-firebase/app @react-native-firebase/messaging
```

### 3. AR Support (iOS)
```bash
npm install react-native-arkit
```

### 4. Voice Input
```typescript
import Voice from '@react-native-voice/voice';

const startVoiceRecognition = async () => {
  try {
    await Voice.start('en-US');
  } catch (e) {
    console.error(e);
  }
};
```

## Performance Optimization

1. **Use React.memo** for expensive components
2. **Lazy load** 3D models
3. **Implement pagination** for lists
4. **Use FlatList** instead of ScrollView for long lists
5. **Optimize images** with react-native-fast-image
6. **Enable Hermes** engine (Android)

## Testing

```bash
# Unit tests
npm test

# E2E tests with Detox
npm install -g detox-cli
detox test
```

## Deployment Checklist

- [ ] Update app version
- [ ] Test on multiple devices
- [ ] Optimize bundle size
- [ ] Enable ProGuard (Android)
- [ ] Configure app signing
- [ ] Prepare app store assets
- [ ] Write app description
- [ ] Submit for review

## Resources

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Three.js](https://threejs.org/)
- [Supabase React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)

## Support

For issues or questions, open an issue on GitHub or contact the development team.

---

**Built with ❤️ for mobile engineering education**
