import './button.css';

interface ButtonProps {
  title: string;
}

const Button = ({ title }: ButtonProps) => {
  return <button>{title}</button>;
};

export default Button;
