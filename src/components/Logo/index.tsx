import logoImg from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import './index.scss';

export const Logo: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className="logo" onClick={handleLogoClick}>
      <img className="logo__img" src={logoImg} alt="Logo" />
      <h4 className="logo__title">Techstack</h4>
    </button>
  );
};
