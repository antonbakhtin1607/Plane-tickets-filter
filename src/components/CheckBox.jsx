import { FormGroup } from '@mui/material';

import { StyledFormControlLabel } from '../styled/StyledCheckBox';
import { CustomCheckbox } from './index';

const CheckBox = () => (
  <>
    <StyledFormControlLabel>Кількість пересадок</StyledFormControlLabel>
    <FormGroup>
      <CustomCheckbox checked={true} label="Все" />
      <CustomCheckbox checked={false} label="Без пересадок" />
      <CustomCheckbox checked={false} label="1 пересадка" />
      <CustomCheckbox checked={false} label="2 пересадки" />
      <CustomCheckbox checked={false} label="3 пересадки" />
    </FormGroup>
  </>
);

export default CheckBox;
