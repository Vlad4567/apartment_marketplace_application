import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './index.scss';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
