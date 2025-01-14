import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup } from '@mui/material';
import { useSearchParams } from 'react-router';

import CustomCheckbox from './CustomCheckBox';
import { StyledFormControlLabel } from '../styled/StyledCheckBox';

import { setTransferFilter } from '../redux/ducks/tickets';

const CheckBox = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const transferFilter = useSelector((state) => state.tickets.transferFilter);

  useEffect(() => {
    const filters = searchParams.get('transfers');
    if (filters) {
      const filterArray = filters.split(',').map(Number);
      dispatch(setTransferFilter(filterArray));
    }
  }, [dispatch, searchParams]);

  const handleCheckboxChange = (value) => {
    const newTransferFilter = [...transferFilter];
    if (newTransferFilter.includes(value)) {
      const index = newTransferFilter.indexOf(value);
      newTransferFilter.splice(index, 1);
    } else {
      newTransferFilter.push(value);
    }
    dispatch(setTransferFilter(newTransferFilter));
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      transfers: newTransferFilter.join(','),
    });
  };

  return (
    <>
      <StyledFormControlLabel>Кількість пересадок</StyledFormControlLabel>
      <FormGroup>
        <CustomCheckbox
          checked={transferFilter.length === 0}
          label="Все"
          onChange={() => {
            dispatch(setTransferFilter([]));
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              transfers: '',
            });
          }}
        />
        <CustomCheckbox
          checked={transferFilter.includes(0)}
          label="Без пересадок"
          onChange={() => handleCheckboxChange(0)}
        />
        <CustomCheckbox
          checked={transferFilter.includes(1)}
          label="1 пересадка"
          onChange={() => handleCheckboxChange(1)}
        />
        <CustomCheckbox
          checked={transferFilter.includes(2)}
          label="2 пересадки"
          onChange={() => handleCheckboxChange(2)}
        />
        <CustomCheckbox
          checked={transferFilter.includes(3)}
          label="3 пересадки"
          onChange={() => handleCheckboxChange(3)}
        />
      </FormGroup>
    </>
  );
};

export default CheckBox;
