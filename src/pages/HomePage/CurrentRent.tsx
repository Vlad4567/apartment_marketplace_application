import { ApartmentCard } from '../../components/ApartmentCard';
import { Apartment } from '../../schemas/apartment';

interface Props {
  rentApartment: Apartment;
  setRentApartment: React.Dispatch<React.SetStateAction<Apartment | null>>;
}

export const CurrentRent: React.FC<Props> = ({
  rentApartment,
  setRentApartment,
}) => {
  const handleRendDelete = () => {
    setRentApartment(null);
  };

  return (
    <div className="home-page__current-rent">
      <h2 className="home-page__current-rent-title">Your current rent</h2>
      <ApartmentCard
        apartment={rentApartment}
        type="rent"
        onDelete={handleRendDelete}
      />
    </div>
  );
};
