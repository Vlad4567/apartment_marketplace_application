import { Apartment } from '../../schemas/apartment';
import apartmentIcon from '../../images/home-white-icon.webp';
import plusIcon from '../../images/plus-icon.svg';
import dropdownIcon from '../../images/dropdown-icon.png';
import { useState } from 'react';
import classNames from 'classnames';
import rentIcon from '../../images/rent-icon.svg';
import './index.scss';

interface Props {
  apartment: Apartment;
  type?: 'default' | 'rent';
  onDelete?: (apartment: Apartment) => void;
  onRent?: (apartment: Apartment) => void;
}

export const ApartmentCard: React.FC<Props> = ({
  apartment,
  type = 'default',
  onDelete = () => {},
  onRent = () => {},
}) => {
  const [isShownDescription, setIsShownDescription] = useState(false);

  const handleToggleDescription = () => {
    setIsShownDescription(prev => !prev);
  };

  return (
    <article className="apartment-card">
      <ul className="apartment-card__list">
        <li className="apartment-card__list-item">
          <div className="apartment-card__img-wrapper">
            <img
              className="apartment-card__img"
              src={apartmentIcon}
              alt="Apartment"
            />
          </div>
          <h3 className="apartment-card__title">{apartment.name}</h3>
        </li>
        <li className="apartment-card__list-item">
          <p className="apartment-card__rooms">
            Rooms: <strong>{apartment.rooms}</strong>
          </p>
          /
          <p className="apartment-card__price">
            Price: <strong>${apartment.price}</strong>
          </p>
        </li>
        <li className="apartment-card__list-item">
          {type !== 'rent' && (
            <button
              type="button"
              className="apartment-card__rent"
              onClick={() => onRent(apartment)}
            >
              <img
                className="apartment-card__rent-img"
                src={rentIcon}
                alt="Dropdown description"
              />
            </button>
          )}
          <button
            type="button"
            className="apartment-card__delete"
            onClick={() => onDelete(apartment)}
          >
            <img
              className="apartment-card__delete-img"
              src={plusIcon}
              alt="Dropdown description"
            />
          </button>
        </li>
      </ul>
      {isShownDescription && (
        <div
          className="apartment-card__description"
          onClick={e => e.stopPropagation()}
        >
          <p className="apartment-card__description-text">
            {apartment.description}
          </p>
        </div>
      )}
      {apartment.description && (
        <button
          type="button"
          className="apartment-card__toggle-dropdown"
          onClick={handleToggleDescription}
        >
          <img
            className={classNames(
              'apartment-card__toggle-dropdown-img',
              isShownDescription &&
                'apartment-card__toggle-dropdown-img--active',
            )}
            src={dropdownIcon}
            alt="Dropdown description"
          />
        </button>
      )}
    </article>
  );
};
