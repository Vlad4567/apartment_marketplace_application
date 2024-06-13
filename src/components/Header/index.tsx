import { useSearchParams } from 'react-router-dom';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { getSearchWith } from '../../helpers/functions';
import { SearchWithParams } from '../../types/main';
import { CSSTransition } from 'react-transition-group';
import { CreateRentModal } from '../CreateRentModal';
import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { useResizeObserver, useScrollLock } from 'usehooks-ts';
import './index.scss';

export const Header: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const headerRef = useRef<HTMLElement>(null);
  const { height: headerHeight = 0 } = useResizeObserver({
    ref: headerRef,
    box: 'border-box',
  });
  const { lock, unlock } = useScrollLock({
    autoLock: false,
  });

  const setSearchWith = (params: SearchWithParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleCreateRent = () => {
    window.scrollTo({ top: 0, left: 0 });
    if (searchParams.get('modal') === 'create-rent') {
      setSearchWith({
        modal: null,
      });
      unlock();
    } else {
      setSearchWith({
        modal: 'create-rent',
      });
      lock();
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <ul className="header__list">
        <li className="header__list-item">
          <Logo />
        </li>
        <li className="header__list-item">
          <Button
            className="header__create-rent-button"
            onClick={handleCreateRent}
          >
            {searchParams.get('modal') === 'create-rent'
              ? 'Close modal'
              : 'Create Rent'}
          </Button>
        </li>
      </ul>
      {createPortal(
        <CSSTransition
          in={searchParams.get('modal') === 'create-rent'}
          unmountOnExit
          timeout={700}
        >
          <CreateRentModal
            style={{
              top: headerHeight,
              height: `calc(100% - ${headerHeight}px)`,
            }}
            className="header__create-rent-modal"
          />
        </CSSTransition>,
        document.body,
      )}
    </header>
  );
};
