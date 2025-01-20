import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { styledTheme } from '../theme';

type CustomCheckboxProps = {
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  label,
  onChange,
}) => (
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

export default CustomCheckbox;
