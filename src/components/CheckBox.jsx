import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PropTypes from 'prop-types';

import { StyledFormControlLabel } from '../styled/StyledCheckBox';

import { styledTheme } from '../theme';

const CustomCheckbox = ({ checked, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked={checked}
          icon={<CheckBoxOutlineBlankOutlinedIcon />}
          checkedIcon={<CheckBoxOutlinedIcon />}
          sx={{
            color: styledTheme.colors.blue,
            '&.Mui-checked': {
              color: styledTheme.colors.blue,
            },
          }}
        />
      }
      label={label}
    />
  );
};

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const CheckBox = () => {
  return (
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
};

export default CheckBox;
