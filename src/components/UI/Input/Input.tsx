import styled from "styled-components";

export interface IinputProps {
  label?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  required?: boolean; 
}

const StyledInput = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  font-family: "Prompt", sans-serif;
`;

const Input: React.FC<IinputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  name,
  required,
}) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        required={required} 
      />
    </div>
  );
};

export default Input;