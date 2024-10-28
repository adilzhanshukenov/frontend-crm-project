import './button.css';

interface ButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{title}</button>;
};

export default Button;
