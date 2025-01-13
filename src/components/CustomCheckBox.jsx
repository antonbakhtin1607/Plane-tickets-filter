import { Checkbox, FormControlLabel } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PropTypes from 'prop-types';

import { styledTheme } from '../theme';

const CustomCheckbox = ({ checked, label }) => (
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

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomCheckbox;
