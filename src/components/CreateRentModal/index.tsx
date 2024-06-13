import classNames from 'classnames';
import { forwardRef } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { Apartment, apartmentSchema } from '../../schemas/apartment';
import { useLocalStorage } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { localStorageKeys } from '../../helpers/variables';
import * as uuid from 'uuid';
import './index.scss';

const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value.replace(/\D/g, '');

  // eslint-disable-next-line no-param-reassign
  e.currentTarget.value = value;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CreateRentModal = forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    const {
      register,
      reset,
      formState: { errors },
      handleSubmit,
    } = useForm<Apartment>({
      resolver: zodResolver(apartmentSchema),
    });
    const [, setApartments] = useLocalStorage<Apartment[]>(
      localStorageKeys.apartments,
      [],
    );

    const handleFormSubmit = handleSubmit(apartment => {
      setApartments(prev => [...prev, { ...apartment, id: uuid.v4() }]);
      reset();
    });

    return (
      <div
        className={classNames('create-rent-modal', className)}
        ref={ref}
        {...rest}
      >
        <form className="create-rent-modal__form" onSubmit={handleFormSubmit}>
          <Input
            title="Name"
            placeholder="Ex. Apartment"
            className="create-rent-modal__form-input"
            errorText={errors.name?.message}
            {...register('name')}
          />
          <Input
            title="Rooms"
            placeholder="3"
            className="create-rent-modal__form-input"
            onInput={handleNumberInput}
            errorText={errors.rooms?.message}
            {...register('rooms')}
          />
          <Input
            title="Price"
            placeholder="99"
            className="create-rent-modal__form-input"
            onInput={handleNumberInput}
            errorText={errors.price?.message}
            {...register('price')}
          />
          <Input
            tag="textarea"
            title="Description"
            placeholder="Ex. 3 bedrooms, 2 bathrooms, 1 garage"
            className="create-rent-modal__form-input"
            errorText={errors.description?.message}
            {...register('description')}
          />
          <Button type="submit" className="create-rent-modal__form-submit">
            Submit rent
          </Button>
        </form>
      </div>
    );
  },
);

CreateRentModal.displayName = 'CreateRentModal';
