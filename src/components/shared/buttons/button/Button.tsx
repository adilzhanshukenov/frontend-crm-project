import './button.css';
import Button from '@mui/material/Button';

interface ButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CommonButton = ({ title, onClick }: ButtonProps) => {
  return (
    <Button className="common-button" variant="contained" onClick={onClick}>
      {title}
    </Button>
  );
};

export default CommonButton;
