import { Checkbox, FormControlLabel } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PropTypes from 'prop-types';

import { styledTheme } from '../theme';

const CustomCheckbox = ({ checked, label, onChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        icon={<CheckBoxOutlineBlankOutlinedIcon />}
        checkedIcon={<CheckBoxOutlinedIcon />}
        onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
};

export default CustomCheckbox;
