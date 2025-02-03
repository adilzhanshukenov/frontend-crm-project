import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectComponentProps } from '../interfaces/selectInterface';

const SelectComponent = ({ placeholder, label, name, title, items, onChange, value }: SelectComponentProps) => {
  return (
    <FormControl>
      <InputLabel>{title}</InputLabel>
      <Select label={label} variant="outlined" name={name} value={value} onChange={onChange}>
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {items}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
