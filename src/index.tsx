import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import './index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<Router />);
