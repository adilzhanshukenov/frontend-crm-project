import { SelectChangeEvent } from "@mui/material";

export interface SelectComponentProps {
    title: string;
    name: string,
    label: string,
    placeholder: string,
    items: JSX.Element[];
    value?: string;
    onChange: (e: SelectChangeEvent<string>) => void;
  }