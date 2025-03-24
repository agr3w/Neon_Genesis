import { createRoot } from 'react-dom/client'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router'
import './styles/Variables.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
)
