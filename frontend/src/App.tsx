import React from 'react';
import Home from './pages/Home';
import AccessibilityPanel from './components/accessibility/AccessibilityPanel';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  return (
    <AccessibilityProvider>
      <Home />
      <AccessibilityPanel />
    </AccessibilityProvider>
  );
}

export default App;
