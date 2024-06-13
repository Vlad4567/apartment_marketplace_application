import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from 'usehooks-ts';
import {
  Filter,
  filterSchema,
  filterSortByOptions,
} from '../../schemas/filter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSearchWith } from '../../helpers/functions';
import { SearchWithParams } from '../../types/main';
import { Apartment } from '../../schemas/apartment';
import { useSearchParams } from 'react-router-dom';

const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value.replace(/\D/g, '');

  // eslint-disable-next-line no-param-reassign
  e.currentTarget.value = value;
};

const handleFilterApartments = (
  apartments: Apartment[],
  data: Partial<Filter>,
) => {
  let result = [...apartments];

  if ((data.rooms || 0) > 0) {
    result = result.filter(apartment => +apartment.rooms === data.rooms);
  }

  switch (data.sortBy) {
    case 'Price - highest to lowest':
      result = result.sort((a, b) => b.price - a.price);
      break;
    case 'Price - lowest to highest':
      result = result.sort((a, b) => a.price - b.price);
      break;
    default:
      break;
  }

  return result;
};

interface Props {
  filteredApartments: Apartment[];
  setFilteredApartments: React.Dispatch<React.SetStateAction<Apartment[]>>;
  apartments: Apartment[];
}

export const ApartmentsHeader: React.FC<Props> = ({
  filteredApartments,
  setFilteredApartments,
  apartments,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isShownDropdownSortBy, setIsShownDropdownSortBy] = useState(false);
  const [dropdownSortByPosition, setDropdownSortByPosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: 0,
    y: 0,
  });
  const { register, getValues, setValue, watch } = useForm<Filter>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      sortBy: (searchParams.get('sortBy') as Filter['sortBy']) || 'Sort by',
      rooms: +(searchParams.get('rooms') || '0') || undefined,
    },
  });
  const sortByDropdownButtonRef = useRef(null);
  const sortByDropdownRef = useRef(null);

  const setSearchWith = useCallback(
    (params: SearchWithParams) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const toggleDropdownSortBy = () => {
    setIsShownDropdownSortBy(prev => !prev);
  };

  const handleSortByOptionClick = (option: Filter['sortBy']) => {
    setValue('sortBy', option);
    setIsShownDropdownSortBy(false);
  };

  useEffect(() => {
    if (sortByDropdownButtonRef.current) {
      const { left: leftParent, bottom: bottomParent } = (
        sortByDropdownButtonRef.current as HTMLElement
      ).getBoundingClientRect();

      setDropdownSortByPosition({ x: leftParent, y: bottomParent });
    }
  }, [sortByDropdownButtonRef]);

  useEffect(() => {
    const handleWatch = (data: Partial<Filter>) => {
      setSearchWith({
        sortBy: data.sortBy !== 'Sort by' && data.sortBy ? data.sortBy : null,
        rooms: +(data.rooms || '0') || null,
      });

      setFilteredApartments(() => handleFilterApartments(apartments, data));
    };

    handleWatch(getValues());

    const subscription = watch(handleWatch);

    return () => {
      subscription.unsubscribe();
    };
  }, [apartments, getValues, setFilteredApartments, setSearchWith, watch]);

  useOnClickOutside([sortByDropdownButtonRef, sortByDropdownRef], () =>
    setIsShownDropdownSortBy(false),
  );

  return (
    <div className="home-page__apartments-header">
      <h2 className="home-page__apartments-title">{`Available Apartments (${filteredApartments.length})`}</h2>

      <div className="home-page__apartments-filter">
        <button
          className={classNames(
            'home-page__apartments-sort-by',
            isShownDropdownSortBy && 'home-page__apartments-sort-by--active',
          )}
          onClick={toggleDropdownSortBy}
          ref={sortByDropdownButtonRef}
        >
          {watch('sortBy')}
        </button>
        <input
          className="home-page__apartments-filter-rooms"
          type="text"
          placeholder="Rooms..."
          onInput={handleNumberInput}
          {...register('rooms', { valueAsNumber: true })}
        />
        {isShownDropdownSortBy &&
          createPortal(
            <div
              className="home-page__apartments-sort-by-dropdown"
              style={{
                left: `${dropdownSortByPosition.x}px`,
                top: `${dropdownSortByPosition.y}px`,
              }}
              ref={sortByDropdownRef}
            >
              {filterSortByOptions.map(option => (
                <button
                  key={option}
                  className={classNames(
                    'home-page__apartments-sort-by-dropdown-option',
                    getValues('sortBy') === option &&
                      `home-page__apartments-sort-by-dropdown-option--active`,
                  )}
                  onClick={() => handleSortByOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};
