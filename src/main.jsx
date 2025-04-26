import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from "jquery";
import "animate.css";
import "swiper/css/bundle";
import "lazysizes";
import "../public/assets/css/index.css";
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
