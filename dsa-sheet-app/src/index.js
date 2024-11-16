import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Create a root element
const container = document.getElementById('root');
const root = createRoot(container); // Use createRoot from react-dom

// Render the app
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
