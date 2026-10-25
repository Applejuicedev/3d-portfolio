import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { gsap } from './components/motion'
import { preloading } from './components/Preloader'

// every gsap animation waits under the preloader until it lifts (Preloader.jsx)
// (and the page is hidden behind it from the first paint, not only once it has mounted)
if (preloading()) { gsap.globalTimeline.pause(); document.documentElement.setAttribute('data-preloading', '') }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
