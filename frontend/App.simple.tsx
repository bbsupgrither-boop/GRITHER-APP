import React from 'react';
import { TestComponent } from './components/TestComponent';

// Log build version
console.info("build", import.meta.env.VITE_APP_BUILD);

export default function App() {
  return <TestComponent />;
}