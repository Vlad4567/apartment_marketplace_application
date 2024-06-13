import { useLocalStorage } from 'usehooks-ts';
import { localStorageKeys } from '../../helpers/variables';
import { Apartment } from '../../schemas/apartment';
import { ApartmentCard } from '../../components/ApartmentCard';
import { useEffect, useState } from 'react';
import { ApartmentsHeader } from './ApartmentsHeader';
import './index.scss';

export const HomePage: React.FC = () => {
  const [apartments, setApartments] = useLocalStorage<Apartment[]>(
    localStorageKeys.apartments,
    [],
  );
  const [rentApartment, setRentApartment] = useLocalStorage<Apartment | null>(
    localStorageKeys.rentApartment,
    null,
  );
  const [filteredApartments, setFilteredApartments] =
    useState<Apartment[]>(apartments);

  const handleApartmentRent = (apartment: Apartment) => {
    setRentApartment(apartment);
  };

  const handleApartmentDelete = (apartment: Apartment) => {
    setApartments(prev => {
      const result = prev.filter(a => a.id !== apartment.id);

      if (!result.length) {
        setFilteredApartments(result);
      }

      return result;
    });
  };

  useEffect(() => {
    if (!apartments.some(apartment => apartment.id === rentApartment?.id)) {
      setRentApartment(null);
    }
  }, [apartments, rentApartment?.id, setRentApartment]);

  return (
    <main className="home-page">
      <div className="home-page__apartments">
        {!!apartments.length && (
          <ApartmentsHeader
            filteredApartments={filteredApartments}
            setFilteredApartments={setFilteredApartments}
            apartments={apartments}
          />
        )}

        {filteredApartments.map(apartment => (
          <ApartmentCard
            key={apartment.id}
            apartment={apartment}
            onRent={handleApartmentRent}
            onDelete={handleApartmentDelete}
          />
        ))}

        {!apartments.length && (
          <h1 className="home-page__apartments-empty-list-title">
            There are no apartments
          </h1>
        )}
      </div>
    </main>
  );
};
